import * as React from 'react';
import { Field } from '../../../libs/form/field';
import { arrayToClass } from '../../libs/array-to-class';
import { randomId } from '../../libs/random-id';
import { BaseComponent } from '../base.component';

interface InputProps extends React.DetailedHTMLProps<any, any> {
    field?: Field;
    type?: 'text' | 'email' | 'password' | 'number';
    customId?: string;
}

export class Input extends React.Component<InputProps, any> {
    public field: Field = this.props.field || new Field();
    public id = this.props.id || randomId();

    // trigger re-rendering if values changes
    public componentDidMount(): void {
        this.field.value$.subscribe((value: any) => this.setState({
            value: value
        }));

        this.field.validate$.subscribe(() => this.forceUpdate());
    }

    public render(): React.ReactNode {
        const classes = arrayToClass([this.props.className]);
        const placeholder = this.field.placeholder;
        const type = this.props.type || 'text';
        const value = this.field.getValue();

        return <div
            className={arrayToClass([
                'uikit-input',
                'button-like',
                this.getValidationClasses()
            ])}
        >
            {this.renderLabel()}

            <div className="input-wrapper">
                <BaseComponent
                    id={this.id}
                    placeholder={placeholder}
                    value={value}
                    type={type}
                    onChange={(event: any) => this.handleChange(event)}
                    className={classes}
                    element="input"
                />
            </div>

        </div>;
    }

    private getValidationClasses(): string {
        return arrayToClass([this.field.errors.length ? 'validation-error' : '', this.field.dirty ? 'dirty' : '']);
    }

    private async handleChange(event) {
        this.setState({
            value: event.target.value
        });
        await this.field.setValue(event.target.value);
    }

    private renderLabel() {
        return <label htmlFor={this.id}>{this.field.label}</label>;
    }
}
