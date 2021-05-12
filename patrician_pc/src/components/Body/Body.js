import React from 'react';

import classes from './Body.module.css';

const Body = () => {
  return (
    <main>
      <div className={classes.scrollContainer}>
        <div className={classes.scrollLeft}></div>
        <div className={classes.scrollCenter}></div>
        <div className={classes.scrollRight}></div>
      </div>
    </main>
  );
};

export default Body;
