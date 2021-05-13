import React from 'react';

import Item from '../Item/Item';

import classes from './Body.module.css';

const Body = () => {
  return (
    <main>
      <div className={classes.scrollContainer}>
        <div className={classes.scrollLeft}></div>
        <div className={classes.scrollCenter}>
          <h1 className={classes.mainHeading}>PATRICIAN 3 PRICE CHECKER</h1>
          <Item />
        </div>
        <div className={classes.scrollRight}></div>
      </div>
    </main>
  );
};

export default Body;
