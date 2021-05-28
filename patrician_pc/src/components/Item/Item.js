import React, { useState, useRef } from 'react';

import classes from './Item.module.css';

const Item = (props) => {
  const [alertMessage, setAlertMessage] = useState({
    alertMessage: null,
    disabled: false,
    className: 'initial',
  });

  const buyInputRef = useRef();
  const sellInputRef = useRef();

  // FOR ALERT MESSAGE ON BTN
  const showAlert = (message = 'SUCCESS', className = 'success') => {
    let alert = { ...alertMessage };

    alert = { alertMessage: message, disabled: true, className: className };
    setAlertMessage({ ...alert });

    setTimeout(() => {
      alert = { alertMessage: null, disabled: false, className: 'initial' };
      setAlertMessage({ ...alert });
    }, 2000);
  };

  // SETS DATAKEY AND REMOVE SPACE i.e 'PIG IRON'
  const dataKey = props.name.split(' ').join('');
  let data = { ...props.data };

  // CREATE DATA OBJ IF ITEM DOESNT EXIST IN DATABASE
  // BUYOBJ
  if (data[dataKey] === undefined || data[dataKey].buy === undefined) {
    data = {
      [dataKey]: {
        ...data[dataKey],
        buy: { avgPrice: 0, loPrice: 0, hiPrice: 0 },
      },
    };
  }
  // SELL OBJ
  if (data[dataKey] === undefined || data[dataKey].sell === undefined) {
    data = {
      [dataKey]: {
        ...data[dataKey],
        sell: { avgPrice: 0, loPrice: 0, hiPrice: 0 },
      },
    };
  }

  const submitPriceHandler = async () => {
    if (buyInputRef.current.value !== '') {
      await props.priceHandler(
        props.name,
        buyInputRef.current.value,
        'buy',
        showAlert
      );
      buyInputRef.current.value = '';
    } else if (sellInputRef.current.value !== '') {
      await props.priceHandler(
        props.name,
        sellInputRef.current.value,
        'sell',
        showAlert
      );
      sellInputRef.current.value = '';
    }
  };

  return (
    <div className={classes.itemContainer}>
      <h2 className={classes.name}>{props.name}:</h2>
      <div className={classes.buy}>
        <h3>BUY:</h3>
        <ul className={classes.priceList}>
          <li className={classes.priceLabel}>
            AVG:
            {
              <span className={classes.priceProp}>
                {data ? data[dataKey].buy.avgPrice : 0}
              </span>
            }
          </li>
          <li className={classes.priceLabel}>
            LO:
            {
              <span className={classes.priceProp}>
                {data ? data[dataKey].buy.loPrice : 0}
              </span>
            }
          </li>
          <li className={classes.priceLabel}>
            HI:
            {
              <span className={classes.priceProp}>
                {data ? data[dataKey].buy.hiPrice : 0}
              </span>
            }
          </li>
        </ul>
      </div>
      <div className={classes.sell}>
        <h3>SELL:</h3>
        <ul className={classes.priceList}>
          <li className={classes.priceLabel}>
            AVG:
            {
              <span className={classes.priceProp}>
                {data ? data[dataKey].sell.avgPrice : 0}
              </span>
            }
          </li>
          <li className={classes.priceLabel}>
            LO:
            {
              <span className={classes.priceProp}>
                {data ? data[dataKey].sell.loPrice : 0}
              </span>
            }
          </li>
          <li className={classes.priceLabel}>
            HI:
            {
              <span className={classes.priceProp}>
                {data ? data[dataKey].sell.hiPrice : 0}
              </span>
            }
          </li>
        </ul>
      </div>
      <form className={classes.buyForm}>
        <input
          type={'number'}
          name={'buy_price'}
          placeholder={'BUY'}
          ref={buyInputRef}
        />
      </form>
      <form className={classes.sellForm}>
        <input
          type={'number'}
          name={'sell_price'}
          placeholder={'SELL'}
          ref={sellInputRef}
        />
      </form>
      <button
        disabled={alertMessage.disabled}
        className={`${classes.submitBtn} ${classes[alertMessage.className]}`}
        onClick={async (e) => {
          e.preventDefault();
          await submitPriceHandler();
        }}
      >
        {alertMessage.alertMessage ? alertMessage.alertMessage : 'Submit Price'}
      </button>
    </div>
  );
};

export default Item;
