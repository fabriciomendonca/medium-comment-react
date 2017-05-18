import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import {
  createStore,
  applyMiddleware
} from 'redux';

import rootReducer from './reducers/index';

import Home from './views/home';

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <Switch>
              <Route path="/" component={Home}></Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;