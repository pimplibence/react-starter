import * as React from 'react';
import { Subscription } from 'rxjs';
import { Field } from '../../../libs/form/field';
import { ValidatorResponseInterface } from '../../../libs/form/validator/validator-response.interface';
import { randomId } from '../../libs/random-id';
import './input.scss';

interface InputProps extends React.DetailedHTMLProps<any, any> {
    field: Field;
    textarea?: boolean;
    type?: 'text' | 'password' | 'number' | 'email';
}

export default class extends React.PureComponent<InputProps> {
    protected componentPrefix: string = 'uikit-input';
    private id = randomId();
    private subscriptions$: Subscription[] = [];
    private cursor = 0;
    private ref: HTMLInputElement | HTMLTextAreaElement;

    public componentDidMount(): void {
        this.subscriptions$.push(
            this.props.field.validate$.subscribe(() => this.forceUpdate()),
            this.props.field.value$.subscribe(() => this.forceUpdate())
        );
    }

    public componentDidUpdate(prevProps: Readonly<InputProps>): void {
        this.ref.setSelectionRange(this.cursor, this.cursor);
    }

    public componentWillUnmount(): void {
        this.subscriptions$.forEach((s: Subscription) => s.unsubscribe());
    }

    public render(): React.ReactNode {
        let classes = '';

        classes += this.componentPrefix;
        classes += ' form-group';
        classes += ` ${this.props.className}`;
        classes += ` ${this.props.field.dirty ? 'dirty' : ''}`;
        classes += ` ${this.props.field.errors.length ? 'has-error' : ''}`;

        return <div className={classes}>
            {this.renderLabel()}
            {!this.props.textarea && this.renderInput()}
            {this.props.textarea && this.renderTextarea()}
            {this.renderHint()}
            {this.renderValidation()}
        </div>;
    }

    private renderValidation(): React.ReactNode {
        if (!this.props.field.errors.length) {
            return null;
        }

        return this.props.field.errors.map((error: ValidatorResponseInterface, index: number) => {
            return <small className={`validation-error form-text text-muted ${!index ? '' : 'hidden'}`} key={index}>{error.error}</small>;
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

    private handleValueChange(event: any) {
        this.cursor = event.target.selectionStart;
        this.props.field.setValue(event.target.value);
    }

    private renderInput(): React.ReactNode {
        return <input
            ref={(ref: any) => (this.ref = ref)}
            id={this.id}
            className="form-control"
            type={this.props.type || 'text'}
            placeholder={this.props.field.placeholder}
            value={this.props.field.getValue()}
            onChange={(event: any) => this.handleValueChange(event)}
        />;
    }

    private renderTextarea(): React.ReactNode {
        return <textarea
            ref={(ref: any) => (this.ref = ref)}
            id={this.id}
            className="form-control"
            placeholder={this.props.field.placeholder}
            value={this.props.field.getValue()}
            onChange={(event: any) => this.handleValueChange(event)}
        />;
    }
}
