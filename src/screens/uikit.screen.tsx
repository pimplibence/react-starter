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
                Validator.REQUIRED('Kötelező mező')
            ]
        }),
        user: new Field({
            label: 'Simple Text Field (email)',
            options: [
                { title: 'First Option', value: 0 },
                { title: 'Second Option', value: 1 },
                { title: 'Third Option', value: 2 },
            ],
            placeholder: 'Input Placeholder',
        })
    });

    public state = {
        areButtonsLoading: false,
        exampleString: this.generateRandomString(),
        formValue: this.form.toJSON(),
    };

    private googleAuth = new GoogleAuth();
    private facebookAuth = new FacebookAuth();

    public async componentDidMount() {
        await this.form.validate();

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
        return <div className="card mb-5">
            <div className="card-header">Forms</div>
            <div className="card-body">

                <UiKit.Button title="GoogleAuth SignIn" loading={this.state.areButtonsLoading} onClick={() => this.handleGoogleSignInClick()} className="btn-warning btn-block mb-3"/>
                <UiKit.Button title="FacebookAuth SignIn" loading={this.state.areButtonsLoading} onClick={() => this.handleFacebookSignInClick()} className="btn-primary btn-block"/>

            </div>
        </div>;
    }

    public renderButtons(): React.ReactNode {
        return <div className="card mb-5">
            <div className="card-header">Buttons</div>
            <div className="card-body">

                <div className="row">
                    <div className="col-12 col-sm-6">
                        <UiKit.Button loading={this.state.areButtonsLoading} title="btn-sm" className="btn-outline-info btn-sm btn-block mb-3"/>
                        <UiKit.Button loading={this.state.areButtonsLoading} title="btn-sm" className="btn-outline-secondary btn-sm btn-block mb-3"/>
                        <UiKit.Button loading={this.state.areButtonsLoading && this.state.exampleString} title="btn-sm" className="btn-outline-danger btn-sm btn-block mb-3"/>
                        <UiKit.Button loading={this.state.areButtonsLoading} title="btn-sm" className="btn-outline-primary btn-sm btn-block mb-3"/>
                        <UiKit.Button loading={this.state.areButtonsLoading} title="btn" className="btn-outline-primary btn-block mb-3"/>
                        <UiKit.Button loading={this.state.areButtonsLoading} title="btn-lg" className="btn-outline-primary btn-lg btn-block mb-3"/>
                    </div>
                    <div className="col-12 col-sm-6">
                        <UiKit.Button loading={this.state.areButtonsLoading} title="Small Button" className="btn-info btn-sm btn-block mb-3"/>
                        <UiKit.Button loading={this.state.areButtonsLoading} title="Small Button" className="btn-secondary btn-sm btn-block mb-3"/>
                        <UiKit.Button loading={this.state.areButtonsLoading} title="Small Button" className="btn-danger btn-sm btn-block mb-3"/>
                        <UiKit.Button loading={this.state.areButtonsLoading} title="Small Button" className="btn-primary btn-sm btn-block mb-3"/>
                        <UiKit.Button loading={this.state.areButtonsLoading} title="btn" className="btn-primary btn-block mb-3"/>
                        <UiKit.Button loading={this.state.areButtonsLoading} title="btn-lg" className="btn-primary btn-lg btn-block mb-3"/>
                    </div>
                    <div className="col-12">
                        <UiKit.Button loading={this.state.areButtonsLoading} title="Small Button" className="btn-info btn-sm mb-3 mr-3"/>
                        <UiKit.Button loading={this.state.areButtonsLoading} title="Small Button" className="btn-secondary btn-sm mb-3 mr-3"/>
                        <UiKit.Button loading={this.state.areButtonsLoading} title="Small Button" className="btn-danger btn-sm mb-3 mr-3"/>
                        <UiKit.Button loading={this.state.areButtonsLoading} title="Small Button" className="btn-primary btn-sm mb-3 mr-3"/>
                        <UiKit.Button loading={this.state.areButtonsLoading} title="btn" className="btn-primary mb-3 mr-3"/>
                        <UiKit.Button loading={this.state.areButtonsLoading} title="btn-lg" className="btn-primary btn-lg mb-3 mr-3"/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <UiKit.Button onClick={() => this.toggleButtonsLoading()} title="Toggle Loading" className="btn-success btn"/>
                    </div>
                </div>

            </div>
        </div>;
    }

    public renderInputs(): React.ReactNode {
        return <div className="card mb-5">
            <div className="card-header">Inputs</div>
            <div className="card-body">

                <div className="row">
                    <div className="col-12 col-sm-6">
                        <UiKit.Input field={this.form.field('email')} className="w-100"/>
                    </div>
                    <div className="col-12 col-sm-6">
                        <UiKit.Input textarea={true} field={this.form.field('email')} className="w-100"/>
                    </div>
                    <div className="col-12 col-sm-6">
                        <UiKit.Select field={this.form.field('user')} className="w-100"/>
                    </div>
                </div>

            </div>
        </div>;
    }

    public render() {
        return <div className="container mt-5">

            {this.renderInputs()}
            {this.renderButtons()}
            {this.renderSocialButtons()}

        </div>;
    }

    private toggleButtonsLoading() {
        this.setState({
            areButtonsLoading: !this.state.areButtonsLoading
        });
    }

    private generateRandomString(): string {
        return `randomString-${Math.random().toFixed(2)}`;
    }
}
