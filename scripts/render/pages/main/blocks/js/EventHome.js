/** @jsx React.DOM */
var React = require('react/addons');

var EventHome = React.createClass({displayName: "EventHome",
  getInitialState : function(){
    return {
      title : 'title',
      picture : 'http://lsc.org/wp-content/uploads/2013/09/birthday-candles-460x300.png?bab04c',
      time : new Date(),
      location : 'New York'
    }
  },
  render : function(){
    return (
         React.createElement("div", {id: "eventHome", "data-lat": this.props.home.latitude, "data-lon": this.props.home.longitude}, 
            React.createElement("div", {id: "title", className: "eventHome"}, 
              React.createElement("p", null, this.props.home.title)
            ), 
            React.createElement("div", {id: "picture", className: "eventHome"}, " ", React.createElement("img", {id: "image", src: this.props.home.picture})), 
            React.createElement("div", {id: "time", className: "eventHome"}, 
              React.createElement("p", null, this.props.home.time)
            ), 
            React.createElement("div", {id: "location", className: "eventHome"}, 
              React.createElement("span", {id: "where"}, 
                React.createElement("p", null, this.props.home.location)
              ), 
              React.createElement("i", {id: "mapButton", className: "fa fa-map-marker fa-lg"})), 
            React.createElement("div", {id: "description", className: "eventHome"})
          )
    )
  }
});

module.exports = EventHome;