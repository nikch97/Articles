import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import './App.css';
import Login from './_component/Login';
import Register from './_component/Register';
import Profile from './_component/Profile';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router basename="/panel">
        <Switch>
          <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
        </Switch>    
      </Router>
      </div> 
    );
  }
}

export default App;
