// require('../style/setup.scss');
// require('../style/main.scss');

import React from 'react';
import HomePage from './pages/main/HomePage.jsx';

var mountNode = document.getElementById("mount_point");

React.render(
  <HomePage />,
  mountNode
);
