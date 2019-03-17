import * as React from 'react';
import { Field } from '../../../libs/form/field';
import { arrayToClass } from '../../libs/array-to-class';
import { randomId } from '../../libs/random-id';
import { BaseComponent } from '../base.component';

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
        const placeholder = this.props.field.placeholder;
        const type = this.props.type || 'text';
        const value = this.props.field.getValue();

        return <BaseComponent
            id={this.id}
            placeholder={placeholder}
            value={value}
            type={type}
            onChange={(event: any) => this.handleChange(event.target.value)}
            className={classes}
            element="input"
        />;
    }

    private async handleChange(value) {
        this.props.field.setValue(value);
    }
}
