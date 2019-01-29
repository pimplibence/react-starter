import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from '../libs/connect';
import { GoogleAuth } from '../libs/google/google-auth';

const clientId = '165911054154-subm0j57ud22ntc7ifgp6eqncn6nqr11.apps.googleusercontent.com';
const apiKey = 'AIzaSyDWUOjWhxsFuBl6oNF_4Q0ZsHnDQdXfuQE';

const mapPropStates = (state: any) => ({});
const mapDispatchProps = (dispatch: (action: any) => void) => ({});

@connect(mapPropStates, mapDispatchProps)
export class HomeScreen extends React.Component<any, any> {
    async componentDidMount() {
        const auth = new GoogleAuth();

        auth.onSignIn(console.log);

        await auth.init(clientId, apiKey);
        await auth.signIn();
    }

    public render() {
        return <div>
            <h3>Home Screen</h3>
            <Link to={'/profile'}>To Profile</Link>
        </div>;
    }
}
