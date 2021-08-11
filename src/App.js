import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NewTable from './components/Component/NewTable.component';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={NewTable} />
      </Switch>
    </BrowserRouter>
  )
};

export default App;
