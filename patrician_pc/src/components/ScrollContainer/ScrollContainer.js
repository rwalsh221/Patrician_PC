import React from 'react';
import classes from './ScrollContainer.module.css';

import ScrollEdge from '../ScrollEdge/ScrollEdge';

const ScrollContainer = () => {
  return (
    <ScrollEdge position={'scrollTop'}/>
    <ScrollEdge position={'scrollBottom}/>

  );
};

export default ScrollContainer;
