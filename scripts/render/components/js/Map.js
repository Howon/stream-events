/** @jsx React.DOM */
var React = require('react/addons');

module.exports = React.createClass({displayName: "exports",
  render : function(){
    return (
        React.createElement("div", {id: "mapPost"}, 
          React.createElement("div", {id: "mapMenu"}, 
            React.createElement("i", {id: "close_map", className: "fa fa-times fa-lg"}), 
            React.createElement("div", {id: "submit_map", className: "fa fa-check fa-lg"})
          ), 
          React.createElement("div", {id: "map"})
        )
    )
  }
});