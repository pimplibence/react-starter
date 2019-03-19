import * as React from 'react';
import { Field } from '../../../libs/form/field';
import { arrayToClass } from '../../libs/array-to-class';
import { randomId } from '../../libs/random-id';

interface FormControlProps extends React.DetailedHTMLProps<any, any> {
    field: Field;
}

export class FormControl extends React.Component<FormControlProps, any> {

    private id = randomId();

    public render(): React.ReactNode {
        const children = React.Children.map(this.props.children, (child: any) => {
            return React.createElement(child.type, {
                ...child.props,
                field: this.props.field,
                id: this.id
            });
        });

        return <div className={arrayToClass(['uikit-form-control'])}>
            {children}
        </div>;
    }
}
