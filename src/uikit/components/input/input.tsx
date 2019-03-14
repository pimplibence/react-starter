import * as React from 'react';
import { Field } from '../../../libs/form/field';
import { arrayToClass } from '../../libs/array-to-class';
import { randomId } from '../../libs/random-id';
import { BaseComponent } from '../base.component';
import './input.scss';

interface InputProps extends React.DetailedHTMLProps<any, any> {
    field: Field;
    type?: 'text' | 'email' | 'password' | 'number';
}

export class Input extends React.Component<InputProps, any> {
    // Random id for htmlFor
    private id = randomId();

    // trigger re-rendering if values changes
    public componentDidMount(): void {
        this.props.field.value$.subscribe((value: any) => this.forceUpdate());
    }

    public render(): React.ReactNode {
        const classes = arrayToClass(['uikit-input', 'mb-3', this.props.className]);

        return <BaseComponent className={classes}>
            {this.renderLabel()}
            {this.renderInput()}
        </BaseComponent>;
    }

    private renderLabel(): React.ReactNode {
        const label = this.props.field.label || null;

        if (!label) {
            return;
        }

        return <label htmlFor={this.id}>{label}</label>;
    }

    private renderInput(): React.ReactNode {
        const placeholder = this.props.field.placeholder;
        const type = this.props.type || 'text';
        const value = this.props.field.getValue();

        return <input
            id={this.id}
            placeholder={placeholder}
            value={value}
            type={type}
            onChange={(event: any) => this.handleChange(event.target.value)}
        />;
    }

    private async handleChange(value) {
        this.props.field.setValue(value);
    }
}
