import * as React from 'react';
import { Field } from '../../../libs/form/field';
import { arrayToClass } from '../../libs/array-to-class';
import { BaseComponent } from '../base.component';

interface InputProps extends React.DetailedHTMLProps<any, any> {
    field?: Field;
    type?: 'text' | 'email' | 'password' | 'number';
    customId?: string;
}

export class Input extends React.Component<InputProps, any> {
    public field: Field = this.props.field || new Field();
    public id = this.props.id || this.field.id;

    // trigger re-rendering if values changes
    public componentDidMount(): void {
        this.field.value$.subscribe((value: any) => this.setState({
            value: value
        }));
    }

    public render(): React.ReactNode {
        const classes = arrayToClass([
            'uikit-input',
            'mb-3',
            this.props.className
        ]);
        const placeholder = this.field.placeholder;
        const type = this.props.type || 'text';
        const value = this.field.getValue();

        return <BaseComponent
            id={this.id}
            placeholder={placeholder}
            value={value}
            type={type}
            onChange={(event: any) => this.handleChange(event)}
            className={classes}
            element="input"
        />;
    }

    private async handleChange(event) {
        this.field.setValue(event.target.value);
        this.setState({
            value: event.target.value
        });
    }
}
