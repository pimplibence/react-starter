import * as React from 'react';
import { FacebookAuth } from '../libs/authentication/facebook/facebook.auth';
import { GoogleAuth } from '../libs/authentication/google/google.auth';
import { Field } from '../libs/form/field';
import { Form } from '../libs/form/form';
import { Validator } from '../libs/form/validator/validator';
import { UiKit } from '../uikit/uikit';

export class UikitScreen extends React.Component<any, any> {

    public form = new Form({
        email: new Field({
            label: 'Simple Text Field (email)',
            placeholder: 'Input Placeholder',
            validators: [
                Validator.REQUIRED('Kötelező mező'),
                Validator.EMAIL('Nem megfelelő email formátum'),
            ]
        })
    });

    public state = {
        formValue: this.form.toJSON()
    };

    private googleAuth = new GoogleAuth();
    private facebookAuth = new FacebookAuth();

    public async componentDidMount() {
        this.form.validate();

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
            console.log(err);
        }
    }

    public async handleFacebookSignInClick() {
        try {
            console.log(await this.facebookAuth.signIn());
        } catch (err) {
            console.log(err);
        }
    }

    public renderSocialButtons(): React.ReactNode {
        return <div className="card mt-5">
            <div className="card-header">Forms</div>
            <div className="card-body">

                <UiKit.Button title="GoogleAuth SignIn" onClick={() => this.handleGoogleSignInClick()} className="btn-warning w-100 mb-3"/>
                <UiKit.Button title="FacebookAuth SignIn" onClick={() => this.handleFacebookSignInClick()} className="btn-primary w-100"/>

            </div>
        </div>;
    }

    public renderButtons(): React.ReactNode {
        return <div className="card mt-5">
            <div className="card-header">Buttons</div>
            <div className="card-body">

                <div className="row">
                    <div className="col-12 col-sm-6">
                        <UiKit.Button title="Small Button" className="btn-outline-primary btn-sm w-100 mb-3"/>
                        <UiKit.Button title="Medium Button" className="btn-outline-primary w-100 mb-3"/>
                        <UiKit.Button title="Large Button" className="btn-outline-primary btn-lg w-100"/>
                    </div>
                    <div className="col-12 col-sm-6">
                        <UiKit.Button title="Small Button" className="btn-primary btn-sm w-100 mb-3"/>
                        <UiKit.Button title="Medium Button" className="btn-primary w-100 mb-3"/>
                        <UiKit.Button title="Large Button" className="btn-primary btn-lg w-100"/>
                    </div>
                </div>

            </div>
        </div>;
    }

    public renderInputs(): React.ReactNode {
        return <div className="card mt-5">
            <div className="card-header">Inputs</div>
            <div className="card-body">

                <div className="row">
                    <div className="col-12 col-sm-6">
                        <UiKit.Input field={this.form.field('email')} className="w-100"/>
                    </div>
                    <div className="col-12 col-sm-6">
                        <UiKit.Input textarea={true} field={this.form.field('email')} className="w-100"/>
                    </div>
                </div>

            </div>
        </div>;
    }

    public render() {
        return <div className="container">

            {this.renderButtons()}
            {this.renderSocialButtons()}
            {this.renderInputs()}

        </div>;
    }
}
