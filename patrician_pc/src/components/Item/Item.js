import React, { useState, useRef } from 'react';

import classes from './Item.module.css';

const Item = (props) => {
  const [alertMessage, setAlertMessage] = useState(null);

  const inputRef = useRef();

  const alert = <div className={classes.alert}>{alertMessage}</div>;

  const showAlert = (message = 'PRICE UPDATED SUCESSFULLY') => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 10000);
  };

  const dataKey = props.name.split(' ').join('');
  let data = { ...props.data };

  if (data && data[dataKey] === undefined)
    data = {
      ...data,
      [dataKey]: { avgPrice: 0, loPrice: 0, hiPrice: 0 },
    };

  return (
    <div className={classes.itemContainer}>
      <h2 className={classes.name}>{props.name}:</h2>
      <ul className={classes.priceList}>
        <li className={classes.priceLabel}>
          AVG:
          {
            <span className={classes.priceProp}>
              {data ? data[dataKey].avgPrice : 0}
            </span>
          }
        </li>
        <li className={classes.priceLabel}>
          LO:
          {
            <span className={classes.priceProp}>
              {data ? data[dataKey].loPrice : 0}
            </span>
          }
        </li>
        <li className={classes.priceLabel}>
          HI:
          {
            <span className={classes.priceProp}>
              {data ? data[dataKey].hiPrice : 0}
            </span>
          }
        </li>
      </ul>
      <form className={classes.form}>
        <input
          type={'number'}
          name={'price'}
          placeholder={'Input New Price'}
          ref={inputRef}
        />
        <button
          className={classes.submitBtn}
          onClick={async (e) => {
            e.preventDefault();
            await props.priceHandler(
              props.name,
              inputRef.current.value,
              showAlert
            );
            inputRef.current.value = '';
          }}
        >
          Submit Price
        </button>
      </form>
      {alertMessage && alert}
    </div>
  );
};

export default Item;
