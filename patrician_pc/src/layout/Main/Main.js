import React from 'react';

// import Header from '../../components/Header/Header';
import Body from '../../components/Body/Body';
import ScrollCenter from '../../components/ScrollCenter/ScrollCenter';
import ScrollEdge from '../../components/ScrollEdge/ScrollEdge';
// import Footer from '../../components/Footer/Footer';

import classes from './Main.module.css';

const Main = () => {
  return (
    <main className={classes.main}>
      <section className={classes.scrollContainer}>
        <ScrollEdge position={'scrollTop'} />
        <ScrollCenter />
        <ScrollEdge position={'scrollBottom'} />
      </section>
    </main>
  );
  // return (
  //   <div className={classes.main}>
  //     {/* <Header /> */}
  //     <Body />
  //     {/* <Footer /> */}
  //   </div>
  // );
};

export default Main;
