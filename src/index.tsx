import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import reduxLogger from 'redux-logger';
// const env = require('../env.json');
import './index.scss';
import { reducers } from './reducers';
import { UikitScreen } from './screens/uikit.screens/uikit.screen';

const root$ = document.getElementById('application');
const history = createBrowserHistory();

const store = createStore(
    combineReducers({
        ...reducers,
        router: connectRouter(history)
    }),
    compose(
        applyMiddleware(routerMiddleware(history)),
        applyMiddleware(reduxLogger)
    )
);

ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <Switch>
            <Route path={'/'} exact={true} component={UikitScreen}/>
            <Route path={'/kiskutya'} exact={true} component={() => <h3>Kiskutya</h3>}/>
        </Switch>
    </ConnectedRouter>
</Provider>, root$);
