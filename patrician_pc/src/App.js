import React from 'react';

import Main from './layout/Main/Main';

require('./App.css');
// require('./Variables.css');
// require('./Grids.css');

let x;

function App() {
  for (let i = 0; i < 100; i += 1) {
    console.log(i);
    console.log(i + 10);
    console.log((i += 10));
    i += 10;
  }
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
