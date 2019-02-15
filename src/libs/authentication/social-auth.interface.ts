export interface SocialAuthSignInResponseInterface {
    accessToken: string;

    [key: string]: string | number | boolean;
}

export interface SocialAuthInterface {
    initialize(credentials: any): Promise<void>;

    signIn(): Promise<SocialAuthSignInResponseInterface>;

    signOut(): Promise<void>;
}
