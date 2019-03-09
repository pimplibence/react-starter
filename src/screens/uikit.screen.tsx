import * as React from 'react';
import { Field } from '../libs/form/field';
import { Form } from '../libs/form/form';
import { Validator } from '../libs/form/validator/validator';
import { Button } from '../uikit/components/button/button';
import { randomId } from '../uikit/libs/random-id';

export class UikitScreen extends React.Component<any, any> {

    public state = {
        lkasjf: randomId()
    };

    public form = new Form({
        email: new Field({
            label: 'Simple Text Field (email)',
            placeholder: 'Input Placeholder',
            validators: [
                Validator.REQUIRED('Kötelező mező')
            ]
        })
    });

    public render(): React.ReactNode {
        return <div>
            <Button title={this.state.lkasjf}/>
        </div>;
    }
}
