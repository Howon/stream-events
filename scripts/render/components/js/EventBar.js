/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');

var Event = React.createClass({displayName: "Event",
  handleEventSwitch : function(e){
    window.location = 'http://localhost:3000/event/' + this.props.id;
    // console.log(window.location.href);
  },
  render: function(){
    return(
        React.createElement("li", {className: "event", "data-id": this.props.id, onClick: this.handleEventSwitch}, 
          React.createElement("div", {className: "eventPost_title"}, this.props.title), 
          React.createElement("div", {className: "eventPost_location"}, this.props.location), 
          React.createElement("div", {className: "eventPost_time"}, this.props.time)
        )
    )
  }
});
  
var EventList = React.createClass({displayName: "EventList",
  getInitialState : function(){
      return {
        events : this.props.events
      }
  },
  render: function(){
    var renderEvent = function(event, i){
        return React.createElement(Event, {key: i, id: event._id, title: event.data.title, location: event.data.location, time: event.data.time})
    }
    return (
        React.createElement("ul", {id: "eventStream"}, 
          this.props.events.map(renderEvent)
        )
    );
  }
});

var EventBarMenu = React.createClass({displayName: "EventBarMenu",
  render : function(){
    return (
        React.createElement("div", {id: "eventBarMenu"}, 
          React.createElement("i", {id: "post_event", className: "fa fa-plus fa-lg"})
        )
    )
  }
});

var EventBar = React.createClass({displayName: "EventBar",
  render : function(){
    return (
        React.createElement("div", {id: "eventBar"}, 
          React.createElement(EventBarMenu, null), 
          React.createElement(EventList, {events: this.props.events})
        )
    )
  }
});

module.exports = EventBar;

