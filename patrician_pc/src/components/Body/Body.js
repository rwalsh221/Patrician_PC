import React from 'react';

import Item from '../Item/Item';

import classes from './Body.module.css';

const Body = () => {
  return (
    <main>
      <div className={classes.scrollContainer}>
        <div className={classes.scrollTop}></div>
        <div className={classes.scrollCenter}>
          <h1 className={classes.mainHeading}>PATRICIAN 3 PRICE CHECKER</h1>
          <Item hi={20} lo={10} avg={15} />
          <Item hi={20} lo={10} avg={15} />
          <Item hi={20} lo={10} avg={15} />
          <Item hi={20} lo={10} avg={15} />
          <Item hi={20} lo={10} avg={15} />
          <Item hi={20} lo={10} avg={15} />
        </div>
        <div className={classes.scrollBottom}></div>
      </div>
    </main>
  );
};

export default Body;
