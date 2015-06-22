/** @jsx React.DOM */
var React = require('react/addons');

module.exports = React.createClass({displayName: "exports",
  render : function(){
    return (  
        React.createElement("div", {id: "menuSelector"}, 
          React.createElement("div", {id: "bringThread", className: "menu"}, React.createElement("i", {className: "fa fa-list-alt fa-2x"})), 
          React.createElement("div", {id: "bringChat", className: "menu"}, React.createElement("i", {className: "fa fa-comments-o fa-2x"}))
        )
    )
  }
});