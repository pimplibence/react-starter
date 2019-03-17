import * as React from 'react';
import { arrayToClass } from '../../libs/array-to-class';
import { BaseComponent } from '../base.component';

export class Spinner extends React.Component<any, any> {
    public render(): React.ReactNode {
        const classes = arrayToClass([
            'uikit-spinner',
            this.props.className
        ]);

        return <BaseComponent className={classes}>
            <i className="material-icons spinner">mood</i>
        </BaseComponent>;
    }
}
