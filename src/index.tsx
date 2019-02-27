import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import './index.scss';
import { SocketFactory } from './libs/socket/socket.factory';
import { reducers } from './reducers';
import { UikitScreen } from './screens/uikit.screen';

const root$ = document.getElementById('application');
const history = createBrowserHistory();

const socket = new SocketFactory();

const store = createStore(
    combineReducers({
        ...reducers,
        router: connectRouter(history),
        socket: socket.reducers(),
    }),
    compose(
        applyMiddleware(routerMiddleware(history)),
        // applyMiddleware(reduxLogger)
    )
);

// Initialize socket library
socket.addStore(store);
/*
socket.initialize((process.env as any).SOCKET_URI, {
    reconnectionDelay: 3000
});
 */

ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <Switch>
            <Route path={'/uikit'} exact={true} component={UikitScreen}/>
        </Switch>
    </ConnectedRouter>
</Provider>, root$);
