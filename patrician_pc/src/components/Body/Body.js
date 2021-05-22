import React, { useState, useRef } from 'react';
// import { database } from '../../firebase';

import Item from '../Item/Item';

import classes from './Body.module.css';

const Body = () => {
  const [addPrice, setAddprice] = useState(false);
  console.log('render');

  const database =
    'https://patrician3-pc-default-rtdb.europe-west1.firebasedatabase.app/';

  const postConfig = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const submitPriceHandler = async (name, newPrice, alert) => {
    // TODO: need to save prices as array
    try {
      if (newPrice <= 0) return alert('PRICE MUST BE GREATER THAN ZERO');
      // 1 get prices array from db
      const getPrices = await fetch(`${database}/item/${name}.json`);

      let getPricesJson = await getPrices.json();
      if (getPricesJson === null) getPricesJson = [];
      console.log(getPricesJson);

      // 2 add new price to array
      getPricesJson.allPrice.push(+newPrice);
      console.log(getPricesJson);

      // 3 sort hi lo avg
      getPricesJson.allPrice.sort(function (a, b) {
        return a - b;
      });
      console.log(getPricesJson);
      const hiPrice = getPricesJson.allPrice[getPricesJson.allPrice.length - 1];
      console.log(hiPrice);
      const loPrice = getPricesJson.allPrice[0];
      console.log(loPrice);

      let sum = 0;

      for (let i = 0; i < getPricesJson.allPrice.length; i++) {
        sum += getPricesJson.allPrice[i];
      }

      const avgPrice = sum / getPricesJson.allPrice.length;
      console.log(avgPrice.toFixed());
      // 4 send back to db

      const addPrice = await fetch(`${database}/item/${name}.json`, {
        ...postConfig,
        body: JSON.stringify({
          allPrice: [...getPricesJson.allPrice],
          hiPrice: hiPrice,
          loPrice: loPrice,
          avgPrice: +avgPrice.toFixed(),
        }),
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
            priceHandler={submitPriceHandler}
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
