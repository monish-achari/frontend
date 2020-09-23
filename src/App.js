import React from 'react';
// import { Route } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TokenComponent from './components/TokenComponent';
import './App.css';


function App() {
  return (
    <div className="App">
          <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={TokenComponent} />
    </div>
  );
}

export default App;
