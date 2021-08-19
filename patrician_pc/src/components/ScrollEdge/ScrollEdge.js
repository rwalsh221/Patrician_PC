import React from 'react';
import classes from './ScrollEdge.module.css';

const ScrollEdge = ({ position }) => {
  return <div className={classes[position]} />;
};

export default ScrollEdge;
