/** @jsx React.DOM */
var React = require('react/addons'),
    socket = require('socket.io-client')('http://localhost:3000');

var EventHome = require('../../components/js/EventHome'),
    EventThread = require('../../components/js/EventThread'),
    EventChat = require('../../components/js/EventChat');
    Map = require('../../components/js/Map'),
    MenuSelector = require('../../components/js/MenuSelector'),
    EventBar = require('../../components/js/EventBar'),
    EventPostArea = require('../../components/js/EventPostArea');

var Body = React.createClass({displayName: "Body",
      getInitialState: function(){
          return {
            home : {},
            thread : [],
            messages : [],
            events : []
          };
      },
      componentDidMount : function(){
        this.setState({
          home : this.props.event.data
        });

        socket.emit('load:thread', this.props.event._id);
        socket.emit('load:events');
        socket.on('load:thread', this.loadThread);
        socket.on('load:events', this.loadEvents);

        socket.on('new:event', this.receiveEvent);
        socket.on('new:chat_message', this.receiveMessage);
        socket.on('new:thread_post', this.receiveThreadPost);
      },
      receiveMessage: function(message){
        var newMessageArray = this.state.messages.slice();    
        newMessageArray.push(message);   
        this.setState({
          messages: newMessageArray
        });
      },
      loadEvents: function(data){
        this.setState({
          events : data
        });
      },
      receiveEvent: function(data){
        var neweventArray = this.state.events.slice();    
        neweventArray.push(data);   
        this.setState({
          events: neweventArray
        });
      },
      postMessage: function(message){
        socket.emit('send:chat_message', {
            user: this.props.user.id,
            message: message
        });
      },
      loadThread: function(data){
        this.setState({
          thread : data
        });
      },
      postThread: function(content){
        socket.emit('post:thread', {
            user_id: this.props.user.id,
            content: content,
            time: new Date(),
            event_source: this.props.event._id
        });
      },
      receiveThreadPost: function(data){
        var newThreadArray = this.state.thread.slice();    
        newThreadArray.push(data);   
        this.setState({
          thread: newThreadArray
        });
      },
      postEvent: function(data){
        socket.emit("post:event", {
          uploader : this.props.user.id,
          content : data
        });
      },
      render : function(){
        return (
          React.createElement("div", null, 
             React.createElement("div", {id: "panel"}, 
                React.createElement("div", {id: "body"}, 
                  React.createElement(EventHome, {home: this.state.home}), 
                  React.createElement(EventThread, {thread: this.state.thread, postThread: this.postThread}), 
                  React.createElement(EventChat, {messages: this.state.messages, postMessage: this.postMessage})
                ), 
                React.createElement(EventBar, {events: this.state.events}), 
                React.createElement(MenuSelector, null)
              ), 
              React.createElement(EventPostArea, {postEvent: this.postEvent})
          )
      )
  }
});

module.exports = Body;

