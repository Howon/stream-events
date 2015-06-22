/** @jsx React.DOM */
var React = require('react/addons');

module.exports = React.createClass({
  render : function(){
    return (  
        <div id="menuSelector">
          <div id="bringThread" className = "menu"><i className = "fa fa-list-alt fa-2x"></i></div>
          <div id="bringChat" className = "menu"><i className = "fa fa-comments-o fa-2x"></i></div>
        </div>
    )
  }
});