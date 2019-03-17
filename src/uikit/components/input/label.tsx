import * as React from 'react';
import { Field } from '../../../libs/form/field';
import { arrayToClass } from '../../libs/array-to-class';
import { BaseComponent } from '../base.component';

interface LabelProps extends React.DetailedHTMLProps<any, any> {
    field?: Field;
    customId?: string;
}

export class Label extends React.Component<LabelProps, any> {
    public field: Field = this.props.field || new Field();
    public id = this.props.id || this.field.id;

    public render(): React.ReactNode {
        const classes = arrayToClass([
            'uikit-label',
            'fw-bold',
            this.props.className
        ]);

        return <BaseComponent
            htmlFor={this.id}
            className={classes}
            element="label"
        >
            {this.field.label}
        </BaseComponent>;
    }
}
