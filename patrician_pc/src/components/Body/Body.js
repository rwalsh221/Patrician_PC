import React, { useState } from 'react';
import { database } from '../../firebase';

import Item from '../Item/Item';

import classes from './Body.module.css';

const Body = () => {
  const [addPrice, setAddprice] = useState(false);
  console.log('render');

  const database =
    'https://patrician3-pc-default-rtdb.europe-west1.firebasedatabase.app/';

  const patchConfig = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const priceHandler = async (name, alert) => {
    // TODO: need to save prices as array
    try {
      const addPrice = await fetch(`${database}${name}/price.json`, {
        ...patchConfig,
        body: JSON.stringify({ price: '10' }),
      });

      if (addPrice.ok) {
        setAddprice(true);
        alert();
      }
      if (!addPrice.ok) throw new Error();
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <main>
      <div className={classes.scrollContainer}>
        <div className={classes.scrollTop}></div>
        <div className={classes.scrollCenter}>
          <h1 className={classes.mainHeading}>PATRICIAN 3 PRICE CHECKER</h1>
          <Item
            name={'beer'}
            priceHandler={priceHandler}
            hi={20}
            lo={10}
            avg={15}
          />
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
