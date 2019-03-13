import * as React from 'react';
import { Field } from '../../libs/form/field';
import { Form } from '../../libs/form/form';
import { Validator } from '../../libs/form/validator/validator';
import { Paletta } from './components/paletta';
import './uikit.screen.scss';

export class UikitScreen extends React.Component<any, any> {

    public form = new Form({
        email: new Field({
            label: 'Simple Field',
            placeholder: 'Input Placeholder',
            validators: [
                Validator.REQUIRED('Kötelező mező')
            ]
        })
    });

    public render(): React.ReactNode {
        return <div className="container mt-5">
            <Paletta/>
        </div>;
    }

}
