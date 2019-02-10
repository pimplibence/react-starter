import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import reduxLogger from 'redux-logger';
import './index.scss';
import { UikitScreen } from './screens/uikit.screen';

const root$ = document.getElementById('application');
const history = createBrowserHistory();

const reducers = {
    router: connectRouter(history)
};

const store = createStore(
    combineReducers(reducers),
    compose(
        applyMiddleware(routerMiddleware(history)),
        applyMiddleware(reduxLogger)
    )
);

ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <Switch>
            <Route path={'/uikit'} exact={true} component={UikitScreen}/>
        </Switch>
    </ConnectedRouter>
</Provider>, root$);
