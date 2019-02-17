import { Field } from '../field';
import { ValidatorResponseInterface } from './validator-response.interface';

export abstract class Validator {
    public static REQUIRED = (response: string) => {
        return (field: Field): ValidatorResponseInterface => {
            return {
                error: response,
                valid: field.getValue().toString().length > 0,
            };
        };
    }
}
