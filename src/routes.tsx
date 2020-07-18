import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Tasks from './pages/Tasks'
import TaskForm from './pages/Tasks/Form';
import TaskDetail from './pages/Tasks/Detail';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/tasks" component={Tasks} />
      <Route path="/task_register" component={TaskForm} />
      <Route path="/task_edit/:id" component={TaskForm} />
      <Route path="/task/:id" component={TaskDetail} />
    </Switch>
  );
}

export default Routes;