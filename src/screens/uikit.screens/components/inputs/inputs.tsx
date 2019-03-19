import * as React from 'react';
import { Field } from '../../../../libs/form/field';
import { Form } from '../../../../libs/form/form';
import { Validator } from '../../../../libs/form/validator/validator';
import { Checkbox } from '../../../../uikit/components/input/checkbox';
import { Input } from '../../../../uikit/components/input/input';
import { arrayToClass } from '../../../../uikit/libs/array-to-class';
import './inputs.scss';

const variants = ['primary', 'secondary', 'accent'];
const sizes = [1, 2, 3];

export class Inputs extends React.Component<any, any> {

    public form = new Form({
        email: new Field({
            placeholder: 'Example Placeholder',
            value: 'lorem ipsum dolor',
            label: 'Kiskutya Label',
            validators: [
                Validator.REQUIRED('Kötelező mező!'),
                Validator.EMAIL('Hülye vagy bazdmeg!'),
            ]
        }),
        categories: new Field({
            placeholder: 'Example Placeholder',
            value: [],
            label: 'Kiskutya Label',
        }),
        isEulaAccepted: new Field({
            value: false,
            label: 'Example Checkbox',
        })
    });

    public componentDidMount(): void {
        this.form.change$.subscribe(async () => {
            this.forceUpdate();
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

            <div className="row">
                <div className="col-24">
                    <Checkbox field={this.form.field('isEulaAccepted')}/>
                </div>
            </div>

            <div className="row">
                <div className="col-24">
                    <pre>{JSON.stringify(this.form.toJSON(), null, 4)}</pre>
                </div>
            </div>

        </div>;
    }

    public async handleSubmit(event: any) {
        event.preventDefault();
        const errors = await this.form.validate();

        if (errors.length) {
            return;
        }
    }
}
