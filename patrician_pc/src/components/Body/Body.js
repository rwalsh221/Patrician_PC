import React, { useState, useEffect } from 'react';
// import { database } from '../../firebase';

import Item from '../Item/Item';

import classes from './Body.module.css';

// TODO: COULD ADD POPUP TO SEE ALL PRICES AND DELETE

const Body = () => {
  const [itemPrices, setItemPrices] = useState(null);

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

      // const prices = {
      //   buy: { ...getBuyPricesJson },
      //   sell: {
      //     beer: {
      //       allPrice: [10, 30, 32, 40, 43, 46, 121],
      //       avgPrice: 46,
      //       hiPrice: 121,
      //       loPrice: 10,
      //     },
      //     cloth: {
      //       allPrice: [204, 306],
      //       avgPrice: 255,
      //       hiPrice: 306,
      //       loPrice: 204,
      //     },
      //     fish: {
      //       allPrice: [433],
      //       avgPrice: 433,
      //       hiPrice: 433,
      //       loPrice: 433,
      //     },
      //     grain: {
      //       allPrice: [89],
      //       avgPrice: 89,
      //       hiPrice: 89,
      //       loPrice: 89,
      //     },
      //     hemp: {
      //       allPrice: [264],
      //       avgPrice: 264,
      //       hiPrice: 264,
      //       loPrice: 264,
      //     },
      //     irongoods: {
      //       allPrice: [242, 253, 253],
      //       avgPrice: 249,
      //       hiPrice: 253,
      //       loPrice: 242,
      //     },
      //     leather: {
      //       allPrice: [235, 268],
      //       avgPrice: 252,
      //       hiPrice: 268,
      //       loPrice: 235,
      //     },
      //     meat: {
      //       allPrice: [938, 1110],
      //       avgPrice: 1024,
      //       hiPrice: 1110,
      //       loPrice: 938,
      //     },
      //     pigiron: {
      //       allPrice: [696, 776, 1012, 2927],
      //       avgPrice: 1353,
      //       hiPrice: 2927,
      //       loPrice: 696,
      //     },
      //     salt: {
      //       allPrice: [31],
      //       avgPrice: 31,
      //       hiPrice: 31,
      //       loPrice: 31,
      //     },
      //     skins: {
      //       allPrice: [829],
      //       avgPrice: 829,
      //       hiPrice: 829,
      //       loPrice: 829,
      //     },
      //     timber: {
      //       allPrice: [35],
      //       avgPrice: 35,
      //       hiPrice: 35,
      //       loPrice: 35,
      //     },
      //     wine: {
      //       allPrice: [167],
      //       avgPrice: 167,
      //       hiPrice: 167,
      //       loPrice: 167,
      //     },
      //   },
      // };

      console.log(getPricesJson);

      setItemPrices(getPricesJson);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getItemPrices();
  }, []);

  console.log(itemPrices);

  const submitPriceHandler = async (name, newPrice, buySell, alert) => {
    // REMOVE SPACES FROM NAME
    if (name.includes(' ')) name = name.split(' ').join('');

    try {
      if (newPrice <= 0) return alert('ERROR', 'error');
      // 1 get prices array from db
      const getPrices = await fetch(`${database}/item/${name}.json`);

      let getPricesJson = await getPrices.json();
      if (getPricesJson === null || getPricesJson[buySell] === undefined)
        getPricesJson = {
          [buySell]: { allPrice: [], hiPrice: 0, loPrice: 0, avgPrice: 0 },
          // sell: { allPrice: [], hiPrice: 0, loPrice: 0, avgPrice: 0 },
        };

      // 2 add new price to allprice array
      getPricesJson[buySell].allPrice.push(+newPrice);

      // 3 get hi lo avg
      getPricesJson[buySell].allPrice.sort(function (a, b) {
        return a - b;
      });

      const hiPrice =
        getPricesJson[buySell].allPrice[
          getPricesJson[buySell].allPrice.length - 1
        ];

      const loPrice = getPricesJson[buySell].allPrice[0];

      let sum = 0;

      for (let i = 0; i < getPricesJson[buySell].allPrice.length; i++) {
        sum += getPricesJson[buySell].allPrice[i];
      }

      const avgPrice = sum / getPricesJson[buySell].allPrice.length;

      // 4 send back to db

      const addPrice = await fetch(`${database}/item/${name}/${buySell}.json`, {
        ...patchConfig,
        body: JSON.stringify({
          allPrice: [...getPricesJson[buySell].allPrice],
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
