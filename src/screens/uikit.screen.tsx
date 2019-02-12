import * as React from 'react';
import { GoogleAuth } from '../libs/authentication/google.auth';

export class UikitScreen extends React.Component<any, any> {

    public async componentDidMount() {
        const auth = new GoogleAuth();
        await auth.initialize({
            apiKey: 'qHwORXY0R-PJ3YLK2_hbAfmF',
            clientId: '165911054154-subm0j57ud22ntc7ifgp6eqncn6nqr11.apps.googleusercontent.com'
        });

        const response = await auth.signIn();

        console.log(response);
    }

    public render() {
        return <div className="container">
            <h1>UikitScreen</h1>
        </div>;
    }
}

/*
import * as React from 'react';
import { connect } from '../libs/connect';

const mapPropStates = (state: any) => ({});
const mapDispatchProps = (dispatch: (action: any) => void) => ({});

@connect(mapPropStates, mapDispatchProps)
export class UikitScreen extends React.Component<any, any> {

    public render() {
        return <div className="container">
            <h1>UikitScreen</h1>
        </div>;
    }
}
*/
