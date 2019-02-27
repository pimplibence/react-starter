// tslint:disable

import Button from './components/button/button';
import Input from './components/input/input';
import Select from './components/select/select';

export abstract class UiKit {
    public static readonly Button = Button;
    public static readonly Select = Select;
    public static readonly Input = Input;
}
