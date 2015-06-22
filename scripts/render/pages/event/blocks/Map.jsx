/** @jsx React.DOM */
var React = require('react/addons');
var map = function(){
  var map_initialized = false;

  (function get_user_location() {
    function showPosition(position) {
        user_lat = position.coords.latitude;
        user_lon = position.coords.longitude;
    }

      if (navigator.geolocation){
          navigator.geolocation.getCurrentPosition(showPosition);
      }
  }());

  var add_event_map = function(){
    var event_lat = document.getElementById('eventHome').dataset.lat;
    var event_lon = document.getElementById('eventHome').dataset.lon;
    controlMap(event_lat, event_lon, 'map');
  };

  document.getElementById("mapButton").onclick = add_event_map;

  var add_post_map = function(){
    controlMap(user_lat, user_lon, 'mapPost');
  };

  document.getElementById("locationSelectorButton").onclick = add_post_map;

  var createMap = function(lat, lon, id){
    if(map_initialized){
      map.remove();
    }

    map = new L.Map("map").setView(new L.LatLng(lat, lon), 16);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      }).addTo(map);

    if(id === 'mapPost'){
      L.Control.geocoder().addTo(map);
      document.getElementById('submit_map').style.display = 'block';
      map.on('GeoCoder_getLatLonName', function (result) {    
          display_name = result.result.display_name;
      });
    }
    
    var marker = L.marker([lat, lon]).addTo(map);
        marker.setLatLng(map.getCenter());
  };

  var controlMap = function(lat, lon, map_id){
    var container = $("#mapPost");
    container.fadeIn(200);

    createMap(lat, lon, map_id);
    map_initialized = true;   

    window.onkeyup = function(e){
      if(e.keyCode == 27){
        container.fadeOut(200); //using jquery instead of velocity because map doesnt behave properly
      }
    };

    window.onmouseup = function (e){
      if (!container.is(e.target) && container.has(e.target).length === 0 ||
        e.target === document.getElementById('close_map') || 
        e.target === document.getElementById('submit_map')){
        container.fadeOut(200); //using jquery instead of velocity because map doesnt behave properly
        }
    };
  };
};
module.exports = React.createClass({
  render : function(){
    return (
        <div id="mapPost">
          <div id="mapMenu">
            <i id="close_map" className="fa fa-times fa-lg"></i>
            <i id="submit_map" className="fa fa-check fa-lg"></i></div>
          <div id="map"></div>
        </div>
    )
  }
});