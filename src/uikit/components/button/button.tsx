import * as React from 'react';
import { BasicVariantPropertyInterface } from '../../libs/basic-variant-property.interface';
import './button.scss';

interface ButtonProps extends BasicVariantPropertyInterface {
    title?: string;
    icon?: string;
    loading?: boolean | string;
}

export default class extends React.Component<ButtonProps> {

    public render(): React.ReactNode {
        let classes = 'uikit-button btn ';
        classes += `${this.props.className || ''} `;
        classes += `${this.props.loading ? 'loading' : ''} `;
        classes += `${this.props.loadingError ? 'loading-error' : ''} `;
        classes += `${this.props.loadingSuccess ? 'loading-success' : ''} `;

        const fix = {
            loading: ''
        };

        return <button {...this.props} {...fix} className={classes}>
            {this.renderContent()}
            {this.renderLoading()}
        </button>;
    }

    private renderContent(): React.ReactNode {
        return <div className="content">
            {this.props.title || ''}
            {this.props.children || ''}
        </div>;
    }

    private loadingText(): null | string {
        if (typeof this.props.loading === 'string') {
            return this.props.loading;
        }

        return null;
    }

    private renderLoading(): React.ReactNode {

        if (!this.props.loading) {
            return '';
        }

        return <div className="loader">
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
            {this.loadingText() ? <span>&nbsp;{this.loadingText()}</span> : ''}
        </div>;
    }

}
