import { SocketFactory } from '../socket.factory';

const initial = false;

export const socketConnectionChangeReducer = (state: boolean = initial, action: any) => {

    if (action.type === SocketFactory.ACTIONS.CONNECTION_CHANGE) {
        // tslint:disable-next-line
        state = action.payload;
    }

    return state;
};
