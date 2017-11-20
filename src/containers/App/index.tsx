import * as React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Home from '../Home';
import Code from '../Code';

export interface AppContainerProps {}
export interface AppContainerState {}

class App extends React.Component<AppContainerProps, AppContainerState> {
  public render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact={true} path="/" component={Home}/>
            <Route path="/code" component={Code}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
