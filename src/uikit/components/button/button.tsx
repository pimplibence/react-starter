import * as React from 'react';
import { BaseComponent } from '../base.component';

export class Button extends React.Component<any, any> {
    public render(): React.ReactNode {
        return <BaseComponent className="uikit-button" usePalette={true} useSize={true} element="button">
            {this.props.title}
        </BaseComponent>;
    }
}
