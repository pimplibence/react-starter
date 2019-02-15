import { SocialAuthInterface, SocialAuthSignInResponseInterface } from '../social-auth.interface';
import { FacebookAuthInterface } from './facebook-auth.interface';

declare const window: any;

export class FacebookAuth implements SocialAuthInterface {
    public async initialize(credentials: FacebookAuthInterface): Promise<void> {
        try {
            await this.download();

            window.FB.init({
                appId: credentials.appId,
                cookie: true,
                status: false,
                version: 'v3.2'
            });

            return Promise.resolve();
        } catch (err) {
            return Promise.reject('FacebookAuthInitializeError');
        }
    }

    public signIn(): Promise<SocialAuthSignInResponseInterface> {
        return new Promise((resolve, reject) => {
            window.FB.getLoginStatus((status: any) => {

                if (status.status === 'connected') {
                    return resolve({
                        accessToken: status.authResponse.accessToken,
                        raw: status.authResponse
                    });
                }

                window.FB.Event.subscribe('auth.statusChange', (event: any) => {

                    if (event.status === 'connected') {
                        return resolve({
                            accessToken: event.authResponse.accessToken,
                            raw: event.authResponse
                        });
                    }

                    if (event.status === 'not_authorized') {
                        return reject('FacebookAuthSignInResponseError (not_authorized)');
                    }

                    return reject('FacebookAuthSignInResponseError (unknown)');
                });

                window.FB.login();
            });

        });
    }

    public signOut(): Promise<void> {
        window.FB.logout();
        return Promise.resolve();
    }

    private download(): Promise<void> {

        if (window.FB) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const fjs = document.getElementsByTagName('script')[0];
            const js = document.createElement('script');

            js.onload = () => resolve();
            js.id = 'facebook-jssdk';
            js.src = 'https://connect.facebook.net/en_US/sdk.js';

            if (!fjs.parentNode) {
                return reject(new Error('FacebookAuthInitializationError'));
            }

            fjs.parentNode.insertBefore(js, fjs);
        });
    }

}
