import * as React from 'react';
import { FacebookAuth } from '../libs/authentication/facebook/facebook.auth';
import { GoogleAuth } from '../libs/authentication/google/google.auth';
import { Log } from '../libs/log';

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
            console.log(err);
        }
    }

    public async handleGoogleSignInClick() {
        try {
            console.log(await this.googleAuth.signIn());
        } catch (err) {
            Log.log(err);
        }
    }

    public async handleFacebookSignInClick() {
        try {
            console.log(await this.facebookAuth.signIn());
        } catch (err) {
            Log.log(err);
        }
    }

    public render() {
        return <div className="container">
            <button onClick={() => this.handleGoogleSignInClick()}>GoogleAuth SignIn</button>
            <button onClick={() => this.handleFacebookSignInClick()}>FacebookAuth SignIn</button>
        </div>;
    }
}
