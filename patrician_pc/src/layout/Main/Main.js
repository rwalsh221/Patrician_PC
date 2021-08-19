import React from 'react';
import classes from './Main.module.css';

const ScrollCenter = React.lazy(() =>
  import('../../components/ScrollCenter/ScrollCenter')
);
const ScrollEdge = React.lazy(() =>
  import('../../components/ScrollEdge/ScrollEdge')
);

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
