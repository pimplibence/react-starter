import { SocialAuthInterface, SocialAuthSignInResponseInterface } from '../social-auth.interface';
import { FacebookAuthInterface } from './facebook-auth.interface';

declare const window: any;

export class FacebookAuth implements SocialAuthInterface {
    public async initialize(credentials: FacebookAuthInterface): Promise<void> {
        try {
            await this.download();
        } catch (err) {
            return Promise.reject('FacebookAuthInitializeError');
        }
        return Promise.resolve();
    }

    public signIn(): Promise<SocialAuthSignInResponseInterface> {
        return Promise.resolve(null as any);
    }

    public signOut(): Promise<void> {
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
