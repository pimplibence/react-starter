import * as React from 'react';
import { Field } from '../../../libs/form/field';
import { BasicVariantPropertyInterface } from '../../libs/basic-variant-property.interface';
// tslint:disable-next-line
import './select.scss';

interface DropdownProps extends BasicVariantPropertyInterface {
    options?: any[];
    field: Field;
    multi?: boolean;
}

export default class extends React.Component<DropdownProps> {

    public state = {
        isOnFocus: true
    };

    public render(): React.ReactNode {
        return <div className={`uikit-select  ${this.state.isOnFocus ? 'focused' : ''}`}>
            {this.renderValuePresenter()}
        </div>;
    }

    private onFocusValuePresenter() {
        this.setState({
            isOnFocus: true
        });
    }

    private onBlurValuePresenter() {
        this.setState({
            isOnFocus: false
        });
    }

    private renderValuePresenter(): React.ReactNode {
        return <div className="value-presenter" tabIndex={0} onFocus={() => this.onFocusValuePresenter()} onBlur={() => this.onBlurValuePresenter()}>
            <span>Value</span>

            {this.renderOptionsPresenter()}
        </div>;
    }

    private renderOptionsPresenter(): React.ReactNode {
        if (!this.state.isOnFocus) {
            return '';
        }

        return <div className="options-presenter">
            <span>Value</span>
        </div>;
    }
}
