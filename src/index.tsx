import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import logger from 'redux-logger';
import './index.scss';
import { HomeScreen } from './screens/home.screen';

// this history will be syncronised with store
const history = createBrowserHistory();

const store = createStore(
    combineReducers({
        // Router reducer, do not rename it (property)
        router: connectRouter(history)
    }),
    compose(
        // this middleware will syncronise history and store
        applyMiddleware(routerMiddleware(history)),
        applyMiddleware(logger)
    )
);

ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <Switch>
            <Route path={'/'} exact component={HomeScreen}/>
        </Switch>
    </ConnectedRouter>
</Provider>, document.getElementById('application'));
