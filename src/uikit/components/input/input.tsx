import * as React from 'react';
import { Field } from '../../../libs/form/field';
import { ValidatorResponseInterface } from '../../../libs/form/validator/validator-response.interface';
import { randomId } from '../../libs/random-id';
import './input.scss';

interface InputProps extends React.DetailedHTMLProps<any, any> {
    field: Field;
    type?: 'text' | 'password' | 'number' | 'email';
}

export default class extends React.Component<InputProps> {

    private id = randomId();

    public componentDidMount(): void {
        this.props.field.validate$.subscribe(() => this.forceUpdate());
        this.props.field.value$.subscribe(() => this.forceUpdate());
    }

    public render(): React.ReactNode {
        const classes = `uikit-input form-group ${this.props.className} ${this.props.field.dirty ? 'dirty' : ''} ${this.props.field.errors.length ? 'has-error' : ''}`;

        return <div className={classes}>

            {this.renderLabel()}
            {this.renderInput()}
            {this.renderHint()}
            {this.renderValidation()}

        </div>;
    }

    private renderValidation(): React.ReactNode {
        if (!this.props.field.errors.length) {
            return null;
        }

        return this.props.field.errors.map((error: ValidatorResponseInterface, index: number) => {
            return <small className="validation-error form-text text-muted" key={index}>{error.error}</small>;
        });
    }

    private renderHint(): React.ReactNode {
        if (!this.props.field.hint) {
            return null;
        }

        return <small className="form-text text-muted">{this.props.field.hint}</small>;
    }

    private renderLabel(): React.ReactNode {
        if (!this.props.field.label) {
            return null;
        }

        return <label htmlFor={this.id}>{this.props.field.label}</label>;
    }

    private renderInput(): React.ReactNode {
        const type = this.props.type || 'text';

        return <input
            id={this.id}
            className="form-control"
            type={type}
            placeholder={this.props.field.placeholder}
            value={this.props.field.getValue()}
            onChange={(event: any) => this.props.field.setValue(event.target.value)}
        />;
    }
}
