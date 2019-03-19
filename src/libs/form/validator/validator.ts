import { Field } from '../field';
import { ValidatorResponseInterface } from './validator-response.interface';

// tslint:disable semicolon

export abstract class Validator {
    public static REQUIRED = (response: string) => {
        return (field: Field): ValidatorResponseInterface => {
            return {
                error: response,
                valid: field.getValue().toString().trim().length > 0,
            };
        };
    };

    public static EMAIL = (response: string) => {
        return (field: Field): ValidatorResponseInterface => {
            const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

            return {
                error: response,
                valid: regex.test(field.getValue().toString()),
            };
        };
    };
}
