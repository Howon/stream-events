/** @jsx React.DOM */

var React = require('react/addons');
var HomePage = React.createFactory(require('./pages/event/EventPage'));

var mountNode = document.getElementById("mount_point");

React.render(new HomePage(window.APP_PROPS), mountNode);
