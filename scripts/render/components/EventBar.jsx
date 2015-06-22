/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');

var Event = React.createClass({
  handleEventSwitch : function(e){
    window.location = 'http://localhost:3000/event/' + this.props.id;
    // console.log(window.location.href);
  },
  render: function(){
    return(
        <li className = "event" data-id = {this.props.id} onClick = {this.handleEventSwitch}>
          <div className = 'eventPost_title'>{this.props.title}</div> 
          <div className = 'eventPost_location'>{this.props.location}</div>
          <div className = 'eventPost_time'>{this.props.time}</div>
        </li>
    )
  }
});
  
var EventList = React.createClass({
  getInitialState : function(){
      return {
        events : this.props.events
      }
  },
  render: function(){
    var renderEvent = function(event, i){
        return <Event key={i} id = {event._id} title = {event.data.title} location = {event.data.location} time = {event.data.time}/>
    }
    return (
        <ul id="eventStream">
          {this.props.events.map(renderEvent)} 
        </ul>
    );
  }
});

var EventBarMenu = React.createClass({
  render : function(){
    return (
        <div id="eventBarMenu">
          <i id="post_event" className="fa fa-plus fa-lg"></i>
        </div>
    )
  }
});

var EventBar = React.createClass({
  render : function(){
    return (
        <div id="eventBar">
          <EventBarMenu />
          <EventList events = {this.props.events}/>
        </div>
    )
  }
});

module.exports = EventBar;

