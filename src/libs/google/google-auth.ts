/**
 * const clientId = '165911054154-subm0j57ud22ntc7ifgp6eqncn6nqr11.apps.googleusercontent.com';
 * const apiKey = 'AIzaSyDWUOjWhxsFuBl6oNF_4Q0ZsHnDQdXfuQE';
 */
declare const gapi: any;

export interface GoogleAuthResponse {
    accessToken: string;
    id: string;
    email: string;
    name: string;
    lastName: string;
    firstName: string;
    profileImage: string;
}

export class GoogleAuth {
    private apiKey: string;
    private clientId: string;
    private callbacks = {
        onInit: () => null,
        onLoaded: () => null,
        onSignIn: (response: GoogleAuthResponse) => null,
        onSignOut: () => null
    };

    public async init(clientId: string, apiKey: string): Promise<void> {
        this.clientId = clientId;
        this.apiKey = apiKey;

        if (!gapi) {
            throw new Error('gapi is not defined! You have to load "https://apis.google.com/js/api.js" as script');
        }

        return new Promise((resolve, reject) => {
            gapi.load('client', async () => {
                this.callbacks.onLoaded();

                try {
                    if (!gapi.client) {
                        throw new Error('gapi is not initialized (NoGapiClientInit)');
                    }

                    await gapi.client.init({
                        apiKey: this.apiKey,
                        client_id: this.clientId,
                        scope: 'profile'
                    } as any);

                    this.callbacks.onInit();
                    resolve();
                } catch (err) {
                    reject(err);
                }

            });
        });
    }

    public async signIn(): Promise<GoogleAuthResponse> {
        try {
            const response = await gapi.auth2.getAuthInstance().signIn();
            const profile = response.getBasicProfile();

            const authResponse: GoogleAuthResponse = {
                accessToken: response.getAuthResponse().access_token,
                id: profile.getFamilyName(),
                email: profile.getEmail(),
                name: profile.getName(),
                firstName: profile.getGivenName(),
                lastName: profile.getFamilyName(),
                profileImage: profile.getImageUrl()
            };

            this.callbacks.onSignIn(authResponse);
            return Promise.resolve(authResponse);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    public async signOut(): Promise<void> {
        try {
            await gapi.auth2.getAuthInstance().signOut();
            this.callbacks.onSignOut();
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err);
        }
    }

    public onInit(cb: () => any) {
        this.callbacks.onInit = () => cb();
    }

    public onSignIn(cb: (response: GoogleAuthResponse) => any) {
        this.callbacks.onSignIn = (response: GoogleAuthResponse) => cb(response);
    }

    public onSignOut(cb: () => any) {
        this.callbacks.onSignOut = () => cb();
    }

    public onLoaded(cb: () => any) {
        this.callbacks.onLoaded = () => cb();
    }
}
