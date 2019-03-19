import * as React from 'react';
import { Field } from '../../../../libs/form/field';
import { Form } from '../../../../libs/form/form';
import { Validator } from '../../../../libs/form/validator/validator';
import { Input } from '../../../../uikit/components/input/input';
import { arrayToClass } from '../../../../uikit/libs/array-to-class';
import './inputs.scss';

const variants = ['primary', 'secondary', 'accent'];
const sizes = [1, 2, 3];

export class Inputs extends React.Component<any, any> {

    public form = new Form({
        email: new Field({
            label: 'Simple Field',
            value: 'pimplibence@gma',
            placeholder: 'example placeholder',
            validators: [
                Validator.REQUIRED('Kötelező mező'),
                Validator.EMAIL('Nem megfelelő email formátum! Kérlek ne legyél egy ostoba faszparaszt te fasz!'),
            ]
        })
    });

    public componentDidMount(): void {
        this.form.change$.subscribe(async () => {
            await this.form.validate();
        });
    }

    public render(): React.ReactNode {
        return <div className={arrayToClass([this.props.className, 'input-example'])}>

            {sizes.map((size: number) => <div className="row" key={size}>

                <div className="col-24">
                    <div className="row">
                        {variants.map((variant: string) => <div key={variant} className="col-24 col-sm-8 col-md-6">

                            <Input className={`input-${variant} size-${size}`} field={this.form.field('email')}/>

                        </div>)}
                    </div>
                </div>

            </div>)}

        </div>;
    }
}
