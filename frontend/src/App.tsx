import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import { API } from './lib/fetcher';

// import { Posts } from './components/todos';
import { Todos } from './components/todos';

import Amplify from 'aws-amplify';

declare const window: any;

Amplify.configure(window.ENV);

function App() {

  return (
    <div className="App">
    <nav className="Navbar">
      <h1 className="navbar-logo">Todolist - {window.ENV.stage || 'no'} Stage</h1>
      <ul className="nav-menu">
        <li> <a href="/todos">Todos</a></li>
      </ul>
      <AmplifySignOut />
    </nav>
  </div>
  );
}

export default withAuthenticator(App);
