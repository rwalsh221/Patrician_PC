import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import classes from './Item.module.css';

const Item = (props) => {
  const { nameProps, dataProps, priceHandlerProps } = props;
  console.log(props.name);

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

    alert = { alertMessage: message, disabled: true, className };
    setAlertMessage({ ...alert });

    setTimeout(() => {
      alert = { alertMessage: null, disabled: false, className: 'initial' };
      setAlertMessage({ ...alert });
    }, 2000);
  };

  // SETS DATAKEY AND REMOVE SPACE i.e 'PIG IRON'
  const dataKey = nameProps.split(' ').join('');
  // TODO: replace data with itemData below
  let itemData = { ...dataProps };

  // CREATE DATA OBJ IF ITEM DOESNT EXIST IN DATABASE
  // BUYOBJ
  if (itemData[dataKey] === undefined || itemData[dataKey].buy === undefined) {
    itemData = {
      [dataKey]: {
        ...itemData[dataKey],
        buy: { avgPrice: 0, loPrice: 0, hiPrice: 0 },
      },
    };
  }
  // SELL OBJ
  if (itemData[dataKey] === undefined || itemData[dataKey].sell === undefined) {
    itemData = {
      [dataKey]: {
        ...itemData[dataKey],
        sell: { avgPrice: 0, loPrice: 0, hiPrice: 0 },
      },
    };
  }

  const submitPriceHandler = async () => {
    if (buyInputRef.current.value !== '') {
      await priceHandlerProps(
        nameProps,
        buyInputRef.current.value,
        'buy',
        showAlert
      );
      buyInputRef.current.value = '';
    } else if (sellInputRef.current.value !== '') {
      await priceHandlerProps(
        nameProps,
        sellInputRef.current.value,
        'sell',
        showAlert
      );
      sellInputRef.current.value = '';
    }
  };

  return (
    <div className={classes.itemContainer}>
      <h2 className={classes.name}>{nameProps}:</h2>
      <div className={classes.buy}>
        <h3>BUY:</h3>
        <ul className={classes.priceList}>
          <li className={classes.priceLabel}>
            AVG:
            <span className={classes.priceProp}>
              {itemData ? itemData[dataKey].buy.avgPrice : 0}
            </span>
          </li>
          <li className={classes.priceLabel}>
            LO:
            <span className={classes.priceProp}>
              {itemData ? itemData[dataKey].buy.loPrice : 0}
            </span>
          </li>
          <li className={classes.priceLabel}>
            HI:
            <span className={classes.priceProp}>
              {itemData ? itemData[dataKey].buy.hiPrice : 0}
            </span>
          </li>
        </ul>
      </div>
      <div className={classes.sell}>
        <h3>SELL:</h3>
        <ul className={classes.priceList}>
          <li className={classes.priceLabel}>
            AVG:
            <span className={classes.priceProp}>
              {itemData ? itemData[dataKey].sell.avgPrice : 0}
            </span>
          </li>
          <li className={classes.priceLabel}>
            LO:
            <span className={classes.priceProp}>
              {itemData ? itemData[dataKey].sell.loPrice : 0}
            </span>
          </li>
          <li className={classes.priceLabel}>
            HI:
            <span className={classes.priceProp}>
              {itemData ? itemData[dataKey].sell.hiPrice : 0}
            </span>
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
        type={'submit'}
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

Item.propTypes = {
  nameProps: PropTypes.string.isRequired,
  dataProps: PropTypes.objectOf(PropTypes.any).isRequired,
  priceHandlerProps: PropTypes.func.isRequired,
};

export default Item;
