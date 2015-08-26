/** @jsx React.DOM */

var React = require('react/addons');
var HomePage = React.createFactory(require('./pages/main/HomePage'));

var mountNode = document.getElementById("mount_point");

React.render(new HomePage(window.APP_PROPS), mountNode);


// // require('../style/setup.scss');
// // require('../style/main.scss');

// // import React from 'react';
// // import HomePage from './pages/login/LoginPage.jsx';

// var mountNode = document.getElementById("mount_point");

// React.render(
//   <HomePage />,
//   mountNode
// );
