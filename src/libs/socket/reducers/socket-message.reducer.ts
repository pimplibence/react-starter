import { SocketMessage } from '../libs/socket.message';
import { SocketFactory } from '../socket.factory';

const initial = new SocketMessage({
    error: false,
    payload: null,
    type: null
});

export const socketMessageReducer = (state: SocketMessage = initial, action: any) => {

    if (action.type === SocketFactory.ACTIONS.INCOMING_MESSAGE) {
        // tslint:disable-next-line
        state = new SocketMessage(action.payload);
    }

    return state;
};
