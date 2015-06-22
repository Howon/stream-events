/** @jsx React.DOM */
var React = require('react/addons'),
    map = require('./Map');
    
var EventHome = React.createClass({
  render : function(){
    return (
         <div id="eventHome" data-lat = {this.props.home.latitude} data-lon = {this.props.home.longitude}>
            <div id="title" className="eventHome">
              <p>{this.props.home.title}</p>
            </div>
            <div id="picture" className="eventHome"> <img id="image" src={this.props.home.img}/></div>
            <div id="time" className="eventHome">
              <p>{this.props.home.time}</p>
            </div>
            <div id="location" className="eventHome"> 
              <span id="where">
                <p>{this.props.home.location}</p>
              </span>
              <i id="mapButton" className="fa fa-map-marker fa-lg"></i></div>
            <div id="description" className="eventHome"></div>
          </div>
    )
  }
});

module.exports = EventHome;