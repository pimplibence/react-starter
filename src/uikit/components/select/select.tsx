import * as React from 'react';
import { Field } from '../../../libs/form/field';
import { BasicVariantPropertyInterface } from '../../libs/basic-variant-property.interface';
import { randomId } from '../../libs/random-id';
// tslint:disable-next-line
import './select.scss';

interface DropdownProps extends BasicVariantPropertyInterface {
    field: Field;
    multi?: boolean;
    renderOption?: (option: any) => React.ReactNode;
}

export default class extends React.Component<DropdownProps> {
    public id = randomId();
    public ref: HTMLDivElement;

    public state: any = {
        open: false,
        options: this.props.field.options,
        selected: this.props.field.getValue() || []
    };

    public componentDidMount(): void {
        window.addEventListener('click', (event: any) => {
            if (this.ref.contains(event.target)) {
                this.open();
            } else {
                this.close();
            }
        });
    }

    public render(): React.ReactNode {
        return <div className="uikit-select" ref={(ref: any) => (this.ref = ref)}>

            {this.renderLabel()}

            <div className={`${this.state.open ? 'focused' : ''}`} id={this.id}>
                {this.renderValuePresenter()}
            </div>

        </div>;
    }

    private renderLabel(): React.ReactNode {
        if (!this.props.field.label) {
            return null;
        }

        return <label onClick={() => this.open()}>{this.props.field.label}</label>;
    }

    private open() {
        this.setState({
            open: true
        });
    }

    private close() {
        this.setState({
            open: false
        });
    }

    private renderValuePresenter(): React.ReactNode {
        const props = {
            className: 'value-presenter',
            onBlur: () => this.close(),
            onFocus: () => this.open(),
            tabIndex: 0,
        };

        return <div {...props}>

            {this.renderSelected()}
            {this.renderOptionsPresenter()}

        </div>;
    }

    private renderSelected(): React.ReactNode {
        if (!this.state.selected.length) {
            return;
        }

        if (this.props.field.multi) {
            return this.state.selected.map((option: any, index: number) => <div key={index} className="selected-item">
                {option.title}
            </div>);
        }

        return this.renderOption(this.state.selected[0], 0);
    }

    private selectItem(option: any) {
        if (this.props.field.multi) {

            const isAlreadyExists = !!this.state.selected.filter((item: any) => item.value === option.value).length;

            if (isAlreadyExists) {
                this.setState({
                    selected: this.state.selected.filter((item: any) => item.value !== option.value)
                });
            } else {
                this.setState({
                    selected: [...this.state.selected, option]
                });
            }
        } else {
            this.setState({
                selected: [option]
            }, () => {
                this.close();
            });
        }
    }

    private isSelected(option: any): boolean {

        for (const item of this.state.selected) {

            if (option.value === item.value) {
                return true;
            }
        }

        return false;
    }

    private renderOption(option: any, index): React.ReactNode {
        let classes = 'item';
        classes += ` ${this.isSelected(option) ? 'selected' : ''}`;

        return <div key={index} className={classes} onClick={() => this.selectItem(option)}>
            <div className="item-wrapper">
                {this.props.renderOption ? this.props.renderOption(option.title) : option.title}
            </div>
        </div>;
    }

    private renderOptionsPresenter(): React.ReactNode {
        if (!this.state.open) {
            return '';
        }

        return <div className="options-presenter">
            {this.state.options.map((option: any, index: number) => this.renderOption(option, index))}
        </div>;
    }
}
