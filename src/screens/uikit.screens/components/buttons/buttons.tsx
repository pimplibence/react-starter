import * as React from 'react';
import { Field } from '../../../../libs/form/field';
import { Button } from '../../../../uikit/components/button/button';
import { Input } from '../../../../uikit/components/input/input';
import { arrayToClass } from '../../../../uikit/libs/array-to-class';
import './buttons.scss';

const variants = ['primary', 'secondary', 'accent', 'red', 'blue', 'green', 'yellow', 'disabled'];
const sizes = [1, 2, 3];

export class Buttons extends React.Component<any, any> {

    public state = {
        loading: false
    };

    public componentDidMount(): void {
        setTimeout(() => {
            this.setState({
                loading: !this.state.loading
            });
        }, 3000);
    }

    public render(): React.ReactNode {
        return <div className={arrayToClass([this.props.className, 'button-example'])}>

            {sizes.map((size: number) => <div className="row" key={size}>

                <div className="col-24">
                    {variants.map((variant: string) => <Button
                        loading={this.state.loading}
                        key={variant}
                        title={variant}
                        className={`button-${variant} size-${size} m-1`}
                    />)}
                </div>

            </div>)}

            <div className="row">
                <div className="col-24">

                    <div className="button-like-group">

                        <Input field={new Field()}/>
                        <Button title={'Shit'}/>

                    </div>

                </div>
            </div>

        </div>;
    }
}
