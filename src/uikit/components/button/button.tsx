import * as React from 'react';
import './button.scss';

interface ButtonProps extends React.DetailedHTMLProps<any, any> {
    title?: string;
    icon?: string;
    loading?: boolean;
}

export default class extends React.Component<ButtonProps> {

    public render(): React.ReactNode {
        return <button {...this.props} className={`uikit-button btn ${this.props.className}`}>
            {this.props.title}
            {this.props.children}
        </button>;
    }

}
