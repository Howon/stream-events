/** @jsx React.DOM */
var React = require('react/addons'),
    Map = require('./Map');

var EventHome = React.createClass({displayName: "EventHome",
  render : function(){
    var img_source = '';
    if(this.props.home.img === 'data:image/jpeg;base64,'){
      img_source = '/images/placeholder.png';
    }else{
      img_source = this.props.home.img;
    };
    return (
         React.createElement("div", {id: "eventHome"}, 
            React.createElement("div", {id: "title", className: "eventHome"}, 
              React.createElement("p", null, this.props.home.title)
            ), 
            React.createElement("div", {id: "picture", className: "eventHome"}, 
              React.createElement("img", {id: "image", src: img_source})
            ), 
            React.createElement("div", {id: "time", className: "eventHome"}, 
              React.createElement("p", null, this.props.home.time)
            ), 
            React.createElement("div", {id: "location", className: "eventHome"}, 
              React.createElement("span", {id: "where"}, 
                React.createElement("p", null, this.props.home.location)
              ), 
               this.props.home.latitude ? 
                React.createElement("i", {id: "mapButton", className: "fa fa-map-marker fa-lg"})
                : null
            ), 
            React.createElement("div", {id: "description", className: "eventHome"}), 
            React.createElement(Map, null)
          )
    )
  }
});

module.exports = EventHome;