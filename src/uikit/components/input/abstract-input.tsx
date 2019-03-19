import * as React from 'react';
import { Field } from '../../../libs/form/field';
import { arrayToClass } from '../../libs/array-to-class';
import { randomId } from '../../libs/random-id';

export interface AbtractInputProps extends React.DetailedHTMLProps<any, any> {
    field: Field;
    id?: string;
}

export abstract class AbstractInput<T> extends React.Component<T & AbtractInputProps, any> {
    public componentClass: string = '';
    public field: Field = this.props.field || new Field();
    public id = this.props.id || randomId();

    public componentDidMount(): void {
        this.field.validate$.subscribe(() => this.forceUpdate());
    }

    protected getClasses(): string {
        return arrayToClass([
            this.componentClass,
            this.props.className,
            this.getValidationClasses(),
        ]);
    }

    protected getValidationClasses(): string {
        return arrayToClass([this.field.errors.length ? 'validation-error' : '', this.field.dirty ? 'dirty' : '']);
    }
}
