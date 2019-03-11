import { range } from 'lodash';
import * as React from 'react';
import { Field } from '../libs/form/field';
import { Form } from '../libs/form/form';
import { Validator } from '../libs/form/validator/validator';
import { randomId } from '../uikit/libs/random-id';
import './uikit.screen.scss';

export class UikitScreen extends React.Component<any, any> {

    public state = {
        randomId: randomId()
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
        return <div className="container">

            <div className="row">

                <div className="col-24">
                    <h1>Hello</h1>
                </div>

                {range(200).map((item: number) => {
                    return range(7).map((index: number) => {
                        return <div key={`${item}-${index}`} className={'col-24 col-sm-12 col-md-6 col-lg-3 col-xl-1'}>
                            {`${item}|${index}`}
                        </div>;
                    });
                })}

            </div>

        </div>;
    }

}
