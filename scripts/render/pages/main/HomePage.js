/** @jsx React.DOM */
var React = require('react/addons'),
    socket = require('socket.io-client')('http://localhost:3000');

var EventHome = require('../../components/js/EventHome'),
    EventBar = require('../../components/js/EventBar'),
    EventPostArea = require('../../components/js/EventPostArea');

var Body = React.createClass({displayName: "Body",
   getInitialState: function(){
      return {
        events : [],
        home : {
          title : 'Original',
          picture : 'http://lsc.org/wp-content/uploads/2013/09/birthday-candles-460x300.png?bab04c',
          time : new Date(),
          location : 'California'
        }
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
              React.createElement(EventBar, {events: this.state.events})
              ), 
              React.createElement(EventPostArea, {postEvent: this.postEvent})
          )
      )
  }
});
/* create factory with griddle component */
/* Module.exports instead of normal dom mounting */
module.exports = Body

