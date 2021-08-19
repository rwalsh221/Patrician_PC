import React from 'react';
import PropTypes from 'prop-types';
import classes from './ScrollEdge.module.css';

const ScrollEdge = ({ position }) => <div className={classes[position]} />;

ScrollEdge.propTypes = {
  position: PropTypes.string.isRequired,
};

export default ScrollEdge;
