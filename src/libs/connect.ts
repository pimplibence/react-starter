import { connect as _connect } from 'react-redux';

type MapStateProps = (state: any) => {
    [key: string]: any
};

type MapDispatchProps = (dispatch: (action: any) => void) => {
    [key: string]: ((...args: any) => void) | (() => void)
};

export const connect = (mapStateProps: MapStateProps, mapDispatchProps: MapDispatchProps, mergeProps?: any): any => {
    return _connect(mapStateProps, mapDispatchProps, mergeProps || null, {
        shouldHandleStateChanges: false
    })
};
