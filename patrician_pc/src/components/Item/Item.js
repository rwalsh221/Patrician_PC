import React from 'react';

import classes from './Item.module.css';

const Item = (props) => {
  return (
    <div className={classes.itemContainer}>
      <h2 className={classes.name}>PlaceHolder Name:</h2>
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
        <input type={'number'} name={'price'} />
        <button className={classes.submitBtn}>Submit Price</button>
      </form>
    </div>
  );
};

export default Item;
