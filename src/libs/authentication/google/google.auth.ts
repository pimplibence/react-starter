import { SocialAuthInterface, SocialAuthSignInResponseInterface } from '../social-auth.interface';
import { GoogleAuthInterface } from './google-auth.interface';

declare const window: any;

export class GoogleAuth implements SocialAuthInterface {

    public async initialize(credentials: GoogleAuthInterface): Promise<void> {
        try {
            await this.download();
            await this.load();

            await window.gapi.auth2.init({
                ...credentials,
                scope: 'profile'
            });

            return Promise.resolve();
        } catch (err) {
            return Promise.reject(new Error(`GoogleAuthInitializeError (${err.message})`));
        }
    }

    public async signIn(): Promise<SocialAuthSignInResponseInterface> {
        if (!window.gapi.auth2) {
            return Promise.reject('GoogleAuthUninitializedAuth2Error');
        }

        try {
            const response = await window.gapi.auth2.getAuthInstance().signIn();

            return Promise.resolve({
                accessToken: response.getAuthResponse().access_token,
                email: response.getBasicProfile().getEmail(),
                raw: response.getAuthResponse()
            });
        } catch (err) {
            return Promise.reject(new Error(`GoogleAuthFailedSignInError (${err.message})`));
        }
    }

    public async signOut(): Promise<void> {
        try {
            await window.gapi.auth2.getAuthInstance().signOut();
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(new Error(`GoogleAuthSignOutError (${err.message})`));
        }
    }

    private download(): Promise<void> {

        if (window.gapi) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('GoogleAuthLoadingScriptError'));
            script.onabort = () => reject(new Error('GoogleAuthLoadingScriptAbort'));
            script.src = 'https://apis.google.com/js/api.js';
            document.head.appendChild(script);
        });
    }

    private load(): Promise<void> {

        if (window.gapi && window.gapi.client) {
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            window.gapi.load('client', () => resolve());
        });
    }
}
