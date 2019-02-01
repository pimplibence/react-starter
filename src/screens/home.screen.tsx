import * as React from 'react';
import { connect } from '../libs/connect';

const mapPropStates = (state: any) => ({});
const mapDispatchProps = (dispatch: (action: any) => void) => ({});

@connect(mapPropStates, mapDispatchProps)
export class HomeScreen extends React.Component<any, any> {
    public render() {
        return <div>
            <h3>Home Screen</h3>
        </div>;
    }
}
