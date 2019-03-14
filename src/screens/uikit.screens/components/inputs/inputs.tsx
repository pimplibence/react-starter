import * as React from 'react';
import { Field } from '../../../../libs/form/field';
import { Form } from '../../../../libs/form/form';
import { Validator } from '../../../../libs/form/validator/validator';
import { Input } from '../../../../uikit/components/input/input';
import { arrayToClass } from '../../../../uikit/libs/array-to-class';
import './inputs.scss';

export class Inputs extends React.Component<any, any> {

    public form = new Form({
        email: new Field({
            label: 'Simple Field',
            value: 'Hello Nigga',
            placeholder: 'Input Placeholder',
            validators: [
                Validator.REQUIRED('Kötelező mező')
            ]
        })
    });

    public componentDidMount(): void {
        this.form.change$.subscribe(() => console.log(this.form.toJSON()));
    }

    public render(): React.ReactNode {
        return <div className={arrayToClass([this.props.className, 'button-example', 'row'])}>

            <div className="col-24">
                <Input title="input-primary" className="input-primary" field={this.form.field('email')}/>
            </div>

            <div className="col-24">
                <Input title="input-primary" className="input-primary" field={this.form.field('email')}/>
            </div>

        </div>;
    }
}
