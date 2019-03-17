import * as React from 'react';
import { Field } from '../../../libs/form/field';
import { randomId } from '../../libs/random-id';

interface FormControlProps extends React.DetailedHTMLProps<any, any> {
    field: Field;
}

export class FormControl extends React.Component<FormControlProps, any> {

    private id = randomId();

    public render(): React.ReactNode {
        return React.Children.map(this.props.children, (child: any) => {
            return React.createElement(child.type, {
                ...child.props,
                field: this.props.field,
                id: this.id
            });
        });
    }
}
