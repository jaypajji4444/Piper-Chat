import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import Layout from './components/Layout/Layout';
import Home from './components/Home';
import Register from './components/Auth/Register';
import Messages from './components/Chat/Messages';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  position: 'top-right',
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnVisibilityChange: true,
  draggable: false,
  pauseOnHover: true,
});

function App() {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <React.Fragment>
            <Switch>
              <Route path="/" component={Home} exact />
              <Layout>
                <Route path="/register" component={Register} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/chat" component={Messages} exact />
              </Layout>
            </Switch>
        </React.Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

