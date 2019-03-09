import * as React from 'react';
import { arrayToClass } from '../libs/array-to-class';

export interface BaseComponentProps extends React.DetailedHTMLProps<any, any> {
    element?: string;
}

export class BaseComponent extends React.Component<BaseComponentProps, any> {
    public render(): React.ReactNode {
        const classes: string[] = [];

        classes.push('ui-base');
        classes.push(this.props.className);

        return React.createElement(this.props.element || 'div', {
            className: arrayToClass(classes)
        }, this.props.children);
    }
}
