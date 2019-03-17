import * as React from 'react';
import { Button } from '../../../../uikit/components/button/button';
import { arrayToClass } from '../../../../uikit/libs/array-to-class';
import './buttons.scss';

const variants = ['primary', 'secondary', 'accent', 'red', 'blue', 'green', 'yellow', 'disabled'];
const sizes = [1, 2, 3];

export class Buttons extends React.Component<any, any> {

    public render(): React.ReactNode {
        return <div className={arrayToClass([this.props.className, 'button-example'])}>

            {sizes.map((size: number) => <div className="row" key={size}>

                <div className="col-24">
                    {variants.map((variant: string) => <Button key={variant} title={variant} className={`button-${variant} size-${size} m-1`}/>)}
                </div>

            </div>)}

        </div>;
    }
}
