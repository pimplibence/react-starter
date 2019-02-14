import * as React from 'react';
import { FacebookAuth } from '../libs/authentication/facebook/facebook.auth';
import { GoogleAuth } from '../libs/authentication/google/google.auth';

export class UikitScreen extends React.Component<any, any> {

    private googleAuth = new GoogleAuth();
    private facebookAuth = new FacebookAuth();

    public async componentDidMount() {
        await this.googleAuth.initialize({
            apiKey: 'qHwORXY0R-PJ3YLK2_hbAfmF',
            clientId: '165911054154-subm0j57ud22ntc7ifgp6eqncn6nqr11.apps.googleusercontent.com'
        });

        await this.facebookAuth.initialize({
            appId: '2022299801404221'
        });
    }

    public async handleGoogleSignInClick() {
        try {
            await this.googleAuth.signIn();
        } catch (err) {
            // console.log(err.message);
        }
    }

    public render() {
        return <div className="container">
            <button onClick={() => this.handleGoogleSignInClick()}>GoogleAuth SignIn</button>
        </div>;
    }
}
