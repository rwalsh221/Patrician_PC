import React, { useEffect, useState } from 'react';
import classes from './ScrollCenter.module.css';

import Header from '../Header/Header';
import Item from '../Item/Item';
import Spinner from '../Spinner/Spinner';

// TODO ADD ERROR POPUP

const ScrollCenter = () => {
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

      setItemPrices(getPricesJson);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getItemPrices();
  }, []);

  const itemNames = [
    'beer',
    'bricks',
    'cloth',
    'fish',
    'grain',
    'hemp',
    'honey',
    'iron goods',
    'leather',
    'meat',
    'pig iron',
    'pitch',
    'pottery',
    'salt',
    'skins',
    'spices',
    'timber',
    'whale oil',
    'wine',
    'wool',
  ];

  const submitPriceHandler = async (itemName, newPrice, buySell, alert) => {
    let name = itemName;
    // REMOVE SPACES FROM NAME
    if (itemName.includes(' ')) name = itemName.split(' ').join('');

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

  let content = <Spinner />;

  if (itemPrices)
    content = itemNames.map((element, index) => (
      <Item
        key={`${element + index}`}
        name={element}
        data={itemPrices}
        priceHandler={submitPriceHandler}
      />
    ));
  return (
    <div className={classes.scrollCenter}>
      <Header />
      {content}
    </div>
  );
};

export default ScrollCenter;