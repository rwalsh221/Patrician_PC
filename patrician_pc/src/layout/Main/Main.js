import React from 'react';

import Header from '../../components/Header/Header';
import Body from '../../components/Body/Body';
import Footer from '../../components/Footer/Footer';

import classes from './Main.module.css';

const Main = () => {
  return (
    <main className={classes.main}>
      <Header />
      <Body />
      <Footer />
    </main>
  );
};

export default Main;
