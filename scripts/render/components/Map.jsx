/** @jsx React.DOM */
var React = require('react/addons');

module.exports = React.createClass({
  render : function(){
    return (
        <div id="mapPost">
          <div id="mapMenu">
            <i id="close_map" className="fa fa-times fa-lg"></i>
            <div id="submit_map" className="fa fa-check fa-lg"></div>
          </div>
          <div id="map"></div>
        </div>
    )
  }
});