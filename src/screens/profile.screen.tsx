import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from '../libs/connect';

const mapPropStates = (state: any) => ({});
const mapDispatchProps = (dispatch: (action: any) => void) => ({});

@connect(mapPropStates, mapDispatchProps)
export class ProfileScreen extends React.Component<any, any> {
    public render() {
        return <div>
            <h3>Profile Screen</h3>
            <Link to={'/'}>To Home</Link>
        </div>;
    }
}
