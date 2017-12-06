import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Products from './routes/Products';
import Operations from './routes/Operations';
import ShiftManagement from './components/operations/ShiftManagement';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/products" exact component={Products} />
        <Route path="/operations" exact component={Operations}/>
        <Route path="/operations/shiftManagement" exact component={ShiftManagement} />
      </Switch>

    </Router>

  );
}

export default RouterConfig;
