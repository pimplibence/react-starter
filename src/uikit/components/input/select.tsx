import * as React from 'react';
import { Field } from '../../../libs/form/field';
import { AbstractInput } from './abstract-input';
import { Input } from './input';

export class Select extends AbstractInput<{}> {
    public labelField: string = 'label';
    public valueField: string = 'value';
    public controlledField: Field = new Field();

    // trigger re-rendering if values changes
    public componentDidMount(): void {
        this.field.validate$.subscribe(() => this.forceUpdate());
    }

    public render(): React.ReactNode {
        return <div className={this.getClasses()}>

            <form className="input-wrapper" onSubmit={(event) => this.handleSubmit(event)}>

                {(this.field.getValue() || []).map((value: any, index: number) => {
                    return <div key={index} className="badge">
                        <span>{value[this.labelField]}</span>
                        <i className="material-icons" onClick={() => this.deleteItem(index)}>close</i>
                    </div>;
                })}

                <Input field={this.controlledField} raw={true}/>

            </form>
            <div className="options-wrapper">
                options
            </div>

        </div>;
    }

    private async handleSubmit(event: any) {
        event.preventDefault();

        await this.field.setValue([
            ...this.field.getValue(),
            { [this.labelField]: this.controlledField.getValue(), [this.valueField]: this.controlledField.getValue() }
        ]);

        await this.controlledField.setValue('');
    }

    private async deleteItem(itemIndex: number) {
        const items = this.field.getValue().filter((item: any, index: number) => (index !== itemIndex));
        await this.field.setValue(items);
    }
}
