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
          <Item name={'beer'} hi={20} lo={10} avg={15} />
          <Item name={'bricks'} hi={20} lo={10} avg={15} />
          <Item name={'cloth'} hi={20} lo={10} avg={15} />
          <Item name={'fish'} hi={20} lo={10} avg={15} />
          <Item name={'grain'} hi={20} lo={10} avg={15} />
          <Item name={'hemp'} hi={20} lo={10} avg={15} />
          <Item name={'honey'} hi={20} lo={10} avg={15} />
          <Item name={'iron goods'} hi={20} lo={10} avg={15} />
          <Item name={'leather'} hi={20} lo={10} avg={15} />
          <Item name={'meat'} hi={20} lo={10} avg={15} />
          <Item name={'pig iron'} hi={20} lo={10} avg={15} />
          <Item name={'pitch'} hi={20} lo={10} avg={15} />
          <Item name={'pottery'} hi={20} lo={10} avg={15} />
          <Item name={'salt'} hi={20} lo={10} avg={15} />
          <Item name={'skins'} hi={20} lo={10} avg={15} />
          <Item name={'spices'} hi={20} lo={10} avg={15} />
          <Item name={'timber'} hi={20} lo={10} avg={15} />
          <Item name={'whale oil'} hi={20} lo={10} avg={15} />
          <Item name={'wine'} hi={20} lo={10} avg={15} />
          <Item name={'wool'} hi={20} lo={10} avg={15} />
        </div>
        <div className={classes.scrollBottom}></div>
      </div>
    </main>
  );
};

export default Body;
