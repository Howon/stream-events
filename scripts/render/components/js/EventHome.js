/** @jsx React.DOM */
var React = require('react/addons'),
    map = require('./Map');
    
var EventHome = React.createClass({displayName: "EventHome",
  render : function(){
    return (
         React.createElement("div", {id: "eventHome", "data-lat": this.props.home.latitude, "data-lon": this.props.home.longitude}, 
            React.createElement("div", {id: "title", className: "eventHome"}, 
              React.createElement("p", null, this.props.home.title)
            ), 
            React.createElement("div", {id: "picture", className: "eventHome"}, " ", React.createElement("img", {id: "image", src: this.props.home.img})), 
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