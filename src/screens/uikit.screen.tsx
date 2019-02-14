import * as React from 'react';
import { FacebookAuth } from '../libs/authentication/facebook/facebook.auth';
import { GoogleAuth } from '../libs/authentication/google/google.auth';

export class UikitScreen extends React.Component<any, any> {

    private googleAuth = new GoogleAuth();
    private facebookAuth = new FacebookAuth();

    public async componentDidMount() {
        try {
            await this.googleAuth.initialize({
                apiKey: process.env.GOOGLE_API_KEY,
                clientId: process.env.GOOGLE_CLIENT_ID
            });

            await this.facebookAuth.initialize({
                appId: process.env.FACEBOOK_APP_ID
            });
        } catch (err) {
            // tslint:disable-next-line
            console.log(err);
            // Handle Error
        }
    }

    public async handleGoogleSignInClick() {
        try {
            await this.googleAuth.signIn();
        } catch (err) {
            // tslint:disable-next-line
            console.log(err);
            // Handle Error
        }
    }

    public render() {
        return <div className="container">
            <button onClick={() => this.handleGoogleSignInClick()}>GoogleAuth SignIn</button>
        </div>;
    }
}
