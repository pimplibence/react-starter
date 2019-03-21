import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import './index.scss';
import { reducers } from './reducers';
import { HomeScreen } from './screens/home.screen';

const env = require('../env.json');

const root$ = document.getElementById('application');
const history = createBrowserHistory();

console.log(env);

const store = createStore(
    combineReducers({
        ...reducers,
        router: connectRouter(history)
    }),
    compose(
        applyMiddleware(routerMiddleware(history)),
        applyMiddleware(reduxLogger),
        applyMiddleware(reduxThunk),
    )
);

ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <Switch>
            <Route path={'/'} exact={true} component={HomeScreen}/>
        </Switch>
    </ConnectedRouter>
</Provider>, root$);
