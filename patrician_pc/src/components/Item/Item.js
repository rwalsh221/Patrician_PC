import React, { useState, useRef } from 'react';

import classes from './Item.module.css';

const Item = (props) => {
  const [alertMessage, setAlertMessage] = useState({
    alertMessage: null,
    disabled: false,
  });

  const inputRef = useRef();

  const showAlert = (message = 'SUCCESS') => {
    let alert = { ...alertMessage };

    alert = { alertMessage: message, disabled: true };
    setAlertMessage({ ...alert });
    setTimeout(() => {
      alert = { alertMessage: null, disabled: false };
      setAlertMessage({ ...alert });
    }, 5000);
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
          placeholder={'Input New Price Above Zero'}
          ref={inputRef}
        />
        <button
          disabled={alertMessage.disabled}
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
          {alertMessage.alertMessage
            ? alertMessage.alertMessage
            : 'Submit Price'}
        </button>
      </form>
    </div>
  );
};

export default Item;
