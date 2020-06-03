import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './store'

import Layout from './components/Layout/Layout';
import Home from './components/Home';

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Home></Home>
      </Provider>
    </React.Fragment>
  );
}

export default App;
