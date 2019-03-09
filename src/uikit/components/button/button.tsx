import * as React from 'react';
import { arrayToClass } from '../../libs/array-to-class';
import { BaseComponent } from '../base.component';
import './style.scss';

export class Button extends React.Component<any, any> {
    public render(): React.ReactNode {
        const classes = arrayToClass(['uikit-button', this.props.className]);

        return <BaseComponent className={classes} element="button">
            {this.renderTitle()}
        </BaseComponent>;
    }

    private renderTitle() {
        if (this.props.title === undefined) {
            return null;
        }

        return <span className="title">
            {this.props.title}
        </span>;
    }
}
