import * as React from 'react';
import { arrayToClass } from '../libs/array-to-class';
import { Palette } from '../palette';
import { Sizes } from '../sizes';

export interface BaseComponentProps extends React.DetailedHTMLProps<any, any> {
    size?: Sizes;
    palette?: Palette;
    useSize?: boolean;
    usePalette?: boolean;
    element?: string;
}

export class BaseComponent extends React.Component<BaseComponentProps, any> {
    public render(): React.ReactNode {
        const classes: string[] = [];

        classes.push('ui-base');

        if (this.props.usePalette) {
            classes.push(this.props.palette || Palette.Primary);
        }

        if (this.props.useSize) {
            classes.push(this.props.size || Sizes.Medium);
        }

        classes.push(this.props.className);

        return React.createElement(this.props.element || 'div', {
            className: arrayToClass(classes)
        }, this.props.children);
    }
}
