import React from 'react';

import classes from './Item.module.css';

const Item = (props) => {
  return (
    <div className={classes.itemContainer}>
      <h2 className={classes.name}>PlaceHolder Name:</h2>
      <ul className={classes.price}>
        <li className={classes.priceLabel}>AVG:</li>
        <li className={classes.priceLabel}>LO:</li>
        <li className={classes.priceLabel}>HI:</li>
      </ul>
      <form>
        <input />
        <button>Submit Price</button>
      </form>
    </div>
  );
};

export default Item;
