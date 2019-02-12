export interface SocialAuthSignInResponseInterface {
    [key: string]: string | number | boolean;

    accessToken: string;

    email: string;
}

export interface SocialAuthInterface {
    initialize(credentials: any): Promise<void>;

    signIn(): Promise<SocialAuthSignInResponseInterface>;

    signOut(): Promise<void>;
}
