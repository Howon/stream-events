/** @jsx React.DOM */
var React = require('react');

var socket = require('socket.io-client')('http://localhost:3000');

var EventHome = require('../../components/js/EventHome'),
    EventBar = require('../../components/js/EventBar'),
    MenuSelector = require('../../components/js/MenuSelector'),
    EventPostArea = require('../../components/js/EventPostArea');

var Body = React.createClass({displayName: "Body",
   getInitialState: function(){
      return {
        home : {},
        events : []
      };
  },
  componentDidMount : function(){
    socket.emit('load:events');
    socket.on('load:events', this.loadEvents);
  },
  loadEvents: function(data){
    this.setState({
      events : data
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
                  React.createElement(EventHome, {home: this.state.home})
                ), 
                React.createElement(EventBar, {events: this.state.events}), 
                React.createElement(MenuSelector, null)
              ), 
              React.createElement(EventPostArea, {postEvent: this.postEvent})
          )
      )
  }
});
/* create factory with griddle component */
/* Module.exports instead of normal dom mounting */
module.exports = Body

