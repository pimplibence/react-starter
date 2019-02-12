import { GoogleAuthInterface } from './google-auth.interface';
import { SocialAuthInterface, SocialAuthSignInResponseInterface } from './social-auth.interface';

declare const window: any;

export class GoogleAuth implements SocialAuthInterface {

    public getAccessToken(): Promise<string> {
        return Promise.resolve('');
    }

    public getProfileData(): Promise<{ [p: string]: string | number | boolean }> {
        return Promise.resolve({});
    }

    public async initialize(credentials: GoogleAuthInterface): Promise<void> {
        await this.download();
        await this.load();

        try {
            await window.gapi.auth2.init({
                ...credentials,
                scope: 'profile'
            });

            return Promise.resolve();
        } catch (err) {
            return Promise.reject(`GoogleAuthInitializeError (${err.message})`);
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
            return Promise.reject(`GoogleAuthFailedSignInError (${err.message})`);
        }
    }

    public signOut(): Promise<void> {
        return Promise.resolve();
    }

    private download(): Promise<void> {

        if (window.gapi) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.onload = () => resolve();
            script.onerror = () => reject('GoogleAuthLoadingScriptError');
            script.onabort = () => reject('GoogleAuthLoadingScriptAbort');
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
