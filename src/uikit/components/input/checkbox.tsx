import jquery from 'jquery';
import * as React from 'react';
import { arrayToClass } from '../../libs/array-to-class';
import { BaseComponent } from '../base.component';
import { AbstractInput } from './abstract-input';
import KeyPressEvent = JQuery.KeyPressEvent;

export class Checkbox extends AbstractInput<{}> {
    public componentClass = 'uikit-checkbox';
    public spaceDownListener: any;

    public componentWillUnmount(): void {
        this.tabIndexRefOnBlur();
    }

    public render(): React.ReactNode {
        const wrapperClasses = arrayToClass([
            'checkbox-wrapper',
            this.field.getValue() ? 'checked' : ''
        ]);

        return <BaseComponent onClick={() => this.handleComponentClick()} className={this.getClasses()}>

            <div className={wrapperClasses} tabIndex={0} id={this.id} onFocus={() => this.tabIndexRefOnFocus()} onBlur={() => this.tabIndexRefOnBlur()}>
                <span className="material-icons checked-state">check</span>
            </div>

            <label htmlFor={this.id}>{this.field.label}</label>

        </BaseComponent>;
    }

    private tabIndexRefOnFocus() {
        this.spaceDownListener = jquery(window).on('keypress', async (event: KeyPressEvent) => {
            if (event.keyCode === 32) {
                event.preventDefault();
                await this.handleComponentClick();
            }
        });
    }

    private tabIndexRefOnBlur() {
        try {
            this.spaceDownListener.off('keypress');
        } catch (e) {
            // Silence is golden
        }
    }

    private async handleComponentClick() {
        await this.field.setValue(!this.field.getValue());
    }
}
