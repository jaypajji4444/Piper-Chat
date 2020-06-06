import React,{useEffect} from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import Layout from './components/Layout/Layout';
import Home from './components/Home';
import Register from './components/Auth/Register';
import Chat from './components/Chat/Chat';
import ForgotPass from './components/Auth/ForgotPass';
import ResetPass from './components/Auth/ResetPass';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadUser } from './actions/authActions';
import NoMatchPage from './components/404';

toast.configure({
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnVisibilityChange: true,
  draggable: false,
  pauseOnHover: true,
});

function App() {

  useEffect(()=>{
    if(localStorage.token){
      store.dispatch(loadUser(localStorage.token))
    }
  },[])

  return (
    <Provider store={store} >
      <BrowserRouter>
        <React.Fragment>
            <Switch>
              <Route path="/" component={Home} exact />
              <Layout>
                <Switch>
                  <Route path="/register" component={Register} exact />
                  <Route path="/login" component={Login} exact />
                  <Route path="/forgotpassword" component={ ForgotPass } exact />
                  <Route path="/chat" component={Chat} exact />
                  <Route path="/resetpassword/:resettoken" component={ResetPass} exact />
                  <Route path="*" component={ NoMatchPage } />
              </Switch>
              </Layout>
            </Switch>
        </React.Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

