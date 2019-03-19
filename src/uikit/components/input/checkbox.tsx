import * as React from 'react';
import { BaseComponent } from '../base.component';
import { AbstractInput } from './abstract-input';

export class Checkbox extends AbstractInput<{}> {
    public componentClass = 'uikit-checkbox';

    public render(): React.ReactNode {
        return <BaseComponent
            className={this.getClasses()}
        />;
    }
}
