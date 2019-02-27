import { SocketMessage } from '../libs/socket/libs/socket.message';
import { SocketFactory } from '../libs/socket/socket.factory';

const initial = {
    createBar: new SocketMessage(),
    createFoo: new SocketMessage(),
};

export const testReducer = (state = initial, action: any) => {

    if (action.type === SocketFactory.ACTIONS.INCOMING_MESSAGE) {
        if (action.payload.type === 'createFoo') {
            state.createFoo = new SocketMessage(action.payload);
        }

        if (action.payload.type === 'createBar') {
            state.createBar = new SocketMessage(action.payload);
        }
    }

    return state;
};
