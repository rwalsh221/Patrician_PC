import React, { useState } from 'react';

import classes from './Item.module.css';

const Item = (props) => {
  const [priceUpdated, setPriceUpdated] = useState(false);

  const showAlert = () => {
    setPriceUpdated(true);
    setTimeout(() => {
      setPriceUpdated(false);
    }, 10000);
  };

  const alert = <div className={classes.alert}>PRRICE UPDATED SUCESSFULLY</div>;
  return (
    <div className={classes.itemContainer}>
      <h2 className={classes.name}>{props.name}:</h2>
      <ul className={classes.priceList}>
        <li className={classes.priceLabel}>
          AVG:{<span className={classes.priceProp}>{props.avg}</span>}
        </li>
        <li className={classes.priceLabel}>
          LO:{<span className={classes.priceProp}>{props.lo}</span>}
        </li>
        <li className={classes.priceLabel}>
          HI:{<span className={classes.priceProp}>{props.hi}</span>}
        </li>
      </ul>
      <form className={classes.form}>
        <input type={'number'} name={'price'} placeholder={'Input New Price'} />
        <button
          className={classes.submitBtn}
          onClick={(e) => {
            e.preventDefault();
            showAlert();
          }}
        >
          Submit Price
        </button>
      </form>
      {priceUpdated && alert}
    </div>
  );
};

export default Item;
