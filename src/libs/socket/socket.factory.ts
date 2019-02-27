import { combineReducers, Reducer, Store } from 'redux';
import * as io from 'socket.io-client';
import { SocketMessage } from './libs/socket.message';
import { socketConnectionChangeReducer } from './reducers/socket-connection-change.reducer';
import { socketMessageReducer } from './reducers/socket-message.reducer';

export class SocketFactory {
    public static readonly ACTIONS = {
        CONNECTION_CHANGE: 'SocketFactory[CONNECTION_CHANGE]',
        INCOMING_MESSAGE: 'SocketFactory[INCOMING_MESSAGE]',
    };

    public store: Store;

    public reducers(): Reducer<any> {
        return combineReducers({
            connected: socketConnectionChangeReducer,
            message: socketMessageReducer,
        });
    }

    public addStore(store: Store) {
        this.store = store;
    }

    public initialize(uri: string, opts?: any) {
        const socket = io.connect(uri, opts);

        socket.on('message', (message: SocketMessage) => {
            this.store.dispatch({
                payload: new SocketMessage(message),
                type: SocketFactory.ACTIONS.INCOMING_MESSAGE
            });

            this.store.dispatch({
                payload: true,
                type: SocketFactory.ACTIONS.CONNECTION_CHANGE
            });
        });

        socket.on('disconnect', () => {
            this.store.dispatch({
                payload: false,
                type: SocketFactory.ACTIONS.CONNECTION_CHANGE
            });
        });
    }
}
