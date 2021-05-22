import React, { useState, useRef, useEffect } from 'react';
// import { database } from '../../firebase';

import Item from '../Item/Item';

import classes from './Body.module.css';

const Body = () => {
  const [itemPrices, setItemPrices] = useState(null);
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

  const getItemPrices = async () => {
    try {
      const getPrices = await fetch(`${database}/item.json`);

      const getPricesJson = await getPrices.json();

      setItemPrices(getPricesJson);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(itemPrices);
  useEffect(() => {
    getItemPrices();
  }, []);

  const submitPriceHandler = async (name, newPrice, alert) => {
    // REMOVE SPACES FROM NAME
    if (name.includes(' ')) name = name.split(' ').join('');

    try {
      if (newPrice <= 0) return alert('PRICE MUST BE GREATER THAN ZERO');
      // 1 get prices array from db
      const getPrices = await fetch(`${database}/item/${name}.json`);

      let getPricesJson = await getPrices.json();
      if (getPricesJson === null)
        getPricesJson = {
          allPrice: [],
          hiPrice: 0,
          loPrice: 0,
          avgPrice: 0,
        };

      // 2 add new price to allprice array
      getPricesJson.allPrice.push(+newPrice);

      // 3 get hi lo avg
      getPricesJson.allPrice.sort(function (a, b) {
        return a - b;
      });

      const hiPrice = getPricesJson.allPrice[getPricesJson.allPrice.length - 1];

      const loPrice = getPricesJson.allPrice[0];

      let sum = 0;

      for (let i = 0; i < getPricesJson.allPrice.length; i++) {
        sum += getPricesJson.allPrice[i];
      }

      const avgPrice = sum / getPricesJson.allPrice.length;

      // 4 send back to db

      const addPrice = await fetch(`${database}/item/${name}.json`, {
        ...patchConfig,
        body: JSON.stringify({
          allPrice: [...getPricesJson.allPrice],
          hiPrice: hiPrice,
          loPrice: loPrice,
          avgPrice: +avgPrice.toFixed(),
        }),
      });

      if (addPrice.ok) {
        await getItemPrices();
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
            data={itemPrices}
          />
          <Item
            name={'bricks'}
            data={itemPrices}
            priceHandler={submitPriceHandler}
          />
          <Item
            name={'cloth'}
            data={itemPrices}
            priceHandler={submitPriceHandler}
          />
          <Item
            name={'fish'}
            data={itemPrices}
            priceHandler={submitPriceHandler}
          />
          <Item
            name={'grain'}
            data={itemPrices}
            priceHandler={submitPriceHandler}
          />
          <Item
            name={'hemp'}
            data={itemPrices}
            priceHandler={submitPriceHandler}
          />
          <Item
            name={'honey'}
            data={itemPrices}
            priceHandler={submitPriceHandler}
          />
          <Item
            name={'iron goods'}
            priceHandler={submitPriceHandler}
            data={itemPrices}
          />
          <Item
            name={'leather'}
            data={itemPrices}
            priceHandler={submitPriceHandler}
          />
          <Item
            name={'meat'}
            data={itemPrices}
            priceHandler={submitPriceHandler}
          />
          <Item
            name={'pig iron'}
            data={itemPrices}
            priceHandler={submitPriceHandler}
          />
          <Item
            name={'pitch'}
            data={itemPrices}
            priceHandler={submitPriceHandler}
          />
          <Item
            name={'pottery'}
            data={itemPrices}
            priceHandler={submitPriceHandler}
          />
          <Item
            name={'salt'}
            data={itemPrices}
            priceHandler={submitPriceHandler}
          />
          <Item
            name={'skins'}
            data={itemPrices}
            priceHandler={submitPriceHandler}
          />
          <Item
            name={'spices'}
            data={itemPrices}
            priceHandler={submitPriceHandler}
          />
          <Item
            name={'timber'}
            data={itemPrices}
            priceHandler={submitPriceHandler}
          />
          <Item
            name={'whale oil'}
            data={itemPrices}
            priceHandler={submitPriceHandler}
          />
          <Item
            name={'wine'}
            data={itemPrices}
            priceHandler={submitPriceHandler}
          />
          <Item
            name={'wool'}
            data={itemPrices}
            priceHandler={submitPriceHandler}
          />
        </div>
        <div className={classes.scrollBottom}></div>
      </div>
    </main>
  );
};

export default Body;
