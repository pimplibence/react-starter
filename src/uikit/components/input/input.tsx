import * as React from 'react';
import { BaseComponent } from '../base.component';
import { AbstractInput } from './abstract-input';

interface InputProps extends React.DetailedHTMLProps<any, any> {
    type?: 'text' | 'email' | 'password' | 'number';
    raw?: boolean;
}

export class Input extends AbstractInput<InputProps> {
    public componentClass = 'uikit-input';

    public componentDidMount(): void {
        this.field.value$.subscribe((value: any) => this.setState({
            value: value
        }));

        super.componentDidMount();
    }

    public render(): React.ReactNode {
        const placeholder = this.field.placeholder;
        const type = this.props.type || 'text';
        const value = this.field.getValue();

        if (this.props.raw) {
            return <BaseComponent
                id={this.id}
                placeholder={placeholder}
                value={value}
                type={type}
                onChange={(event: any) => this.handleChange(event)}
                element="input"
            />;
        }

        return <div className={this.getClasses()}>
            {this.renderLabel()}

            <div className="input-wrapper button-like-group">
                <BaseComponent
                    id={this.id}
                    placeholder={placeholder}
                    value={value}
                    type={type}
                    onChange={(event: any) => this.handleChange(event)}
                    className={this.getClasses()}
                    element="input"
                />
            </div>

        </div>;
    }

    private async handleChange(event) {
        this.setState({
            value: event.target.value
        });
        await this.field.setValue(event.target.value);
    }

    private renderLabel() {
        return <label htmlFor={this.id}>{this.field.label}</label>;
    }
}
