import { Subject } from 'rxjs';
import { Field } from './field';

export class Form {
    public change$ = new Subject();
    public fields: { [key: string]: Field } = {};

    constructor(fields: { [key: string]: Field }) {
        this.fields = fields;

        Object.keys(this.fields).forEach((key: string) => {

            this.fields[key].setParentForm(this);

            this.fields[key].value$.subscribe((value: any) => {
                this.change$.next(this.toJSON());
            });
        });
    }

    public field(key: string): Field {
        return this.fields[key];
    }

    public async validate() {
        const errors: any[] = [];

        for (const key of Object.keys(this.fields)) {
            await this.fields[key].validate();
            if (this.fields[key].errors.length) {
                errors.push({
                    errors: this.fields[key].errors,
                    key: key,
                });
            }
        }

        return errors;
    }

    public toJSON(): { [key: string]: any } {
        const ret = {};
        Object.keys(this.fields).forEach((key: string) => ret[key] = this.fields[key].getValue());
        return ret;
    }
}
