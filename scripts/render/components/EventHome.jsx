/** @jsx React.DOM */
var React = require('react/addons'),
    Map = require('./Map');

var EventHome = React.createClass({
  render : function(){
    var img_source = '';
    if(!this.props.home.img){
      img_source = '/images/placeholder.png';
    }else{
      img_source = this.props.home.img;
    };
    return (
         <div id="eventHome">
            <div id="title" className="eventHome">
              <p>{this.props.home.title}</p>
            </div>
            <div id="picture" className="eventHome"> 
              <img id="image" src={img_source}/>
            </div>
            <div id="time" className="eventHome">
              <p>{this.props.home.time}</p>
            </div>
            <div id="location" className="eventHome"> 
              <span id="where">
                <p>{this.props.home.location ? this.props.home.location.name : ""}</p>              
              </span>
              {this.props.home.location ? <i id="mapButton" className="fa fa-map-marker fa-lg"></i> : null }
            </div>
            <div id="description" className="eventHome"></div>
            <Map />
          </div>
    )
  }
});

module.exports = EventHome;