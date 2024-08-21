import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Otp from './Pages/Otp';
import { useState } from 'react';

function App() {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Login phone={phone} setPhone={setPhone}/>
            </div>
          </Route>
          <Route path="/login">
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Login phone={phone} setPhone={setPhone}/>
            </div>
          </Route>
          <Route path="/register">
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Register name={name} phone={phone} setName={setName} setPhone={setPhone} />
            </div>
          </Route>
          <Route path="/otp">
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Otp phone={phone} />
            </div>
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
