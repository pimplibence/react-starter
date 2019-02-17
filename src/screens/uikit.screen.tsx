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
            label: 'Email Address',
            placeholder: 'Email Placeholder',
            validators: [
                Validator.REQUIRED('Kötelező mező')
            ]
        }),
        firstName: new Field({
            label: 'FirstName',
            placeholder: 'FirstName Placeholder',
            validators: [
                Validator.REQUIRED('Kötelező mező')
            ]
        })
    });

    public state = {
        formValue: this.form.toJSON()
    };

    private googleAuth = new GoogleAuth();
    private facebookAuth = new FacebookAuth();

    public async componentDidMount() {
        this.form.change$.subscribe(() => this.setState({ formValue: this.form.toJSON() }));

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

    public render() {
        return <div className="container">

            <div className="card">
                <div className="card-header">Buttons</div>
                <div className="card-body">
                    <UiKit.Button title="GoogleAuth SignIn" onClick={() => this.handleGoogleSignInClick()} className="btn-warning"/>
                    <UiKit.Button title="FacebookAuth SignIn" onClick={() => this.handleFacebookSignInClick()} className="btn-primary"/>
                    <UiKit.Button title="Simple Danger Button" className="btn-danger"/>
                </div>
            </div>

            <div className="card">
                <div className="card-header">Forms</div>
                <div className="card-body">
                    <div className="row">
                        <UiKit.Input field={this.form.field('email')} className="col-12 col-sm-6"/>
                        <UiKit.Input field={this.form.field('email')} className="col-12 col-sm-6"/>
                        <UiKit.Input field={this.form.field('firstName')} className="col-12 col-sm-6"/>
                    </div>
                    <hr/>
                    <code>
                        <pre>{JSON.stringify(this.state.formValue, null, 4)}</pre>
                    </code>
                </div>
            </div>

        </div>;
    }
}
