import React from 'react';

import ScrollCenter from '../../components/ScrollCenter/ScrollCenter';
import ScrollEdge from '../../components/ScrollEdge/ScrollEdge';

import classes from './Main.module.css';

const Main = () => (
  <main className={classes.main}>
    <section className={classes.scrollContainer}>
      <ScrollEdge position="scrollTop" />
      <ScrollCenter />
      <ScrollEdge position="scrollBottom" />
    </section>
  </main>
);
export default Main;
