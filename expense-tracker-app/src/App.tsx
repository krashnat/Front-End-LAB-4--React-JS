import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './style.css';
import ShowList from './components/ShowList';
import ExpenseTracker from './components/ExpenseTracker';

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/add" component={ExpenseTracker} />
          <Route path="/" component={ShowList} />
        </Switch>
      </BrowserRouter>
    </div>

  );
}

export default App;
