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

var Body = React.createClass({
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
          <div>
             <div id = 'panel'>
                <div id="body">
                  <EventHome home = {this.state.home}/>
                  <EventThread thread = {this.state.thread} postThread = {this.postThread}/>
                  <EventChat messages = {this.state.messages} postMessage = {this.postMessage}/>
                </div>
                <EventBar events = {this.state.events}/>
                <MenuSelector />
              </div>
              <EventPostArea postEvent = {this.postEvent}/>
          </div>
      )
  }
});

module.exports = Body;

