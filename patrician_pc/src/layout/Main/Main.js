import React from 'react';
import classes from './Main.module.css';

import ScrollCenter from '../../components/ScrollCenter/ScrollCenter';
import ScrollEdge from '../../components/ScrollEdge/ScrollEdge';

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
