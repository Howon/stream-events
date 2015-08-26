/** @jsx React.DOM */
var React = require('react');

var socket = require('socket.io-client')('http://localhost:3000');

var EventHome = require('../../components/js/EventHome'),
    EventBar = require('../../components/js/EventBar'),
    MenuSelector = require('../../components/js/MenuSelector'),
    EventPostArea = require('../../components/js/EventPostArea');

var Body = React.createClass({
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
        <div>
             <div id = 'panel'>
                <div id="body">
                  <EventHome home = {this.state.home}/>                  
                </div>
                <EventBar events = {this.state.events}/>
                <MenuSelector />
              </div>
              <EventPostArea postEvent = {this.postEvent}/>
          </div>
      )
  }
});
/* create factory with griddle component */
/* Module.exports instead of normal dom mounting */
module.exports = Body

