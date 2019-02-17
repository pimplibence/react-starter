// tslint:disable
import '../../node_modules/bootstrap/scss/bootstrap.scss';

import Button from './components/button/button';
import Input from './components/input/input';

export abstract class UiKit {
    public static readonly Button = Button;
    public static readonly Input = Input;
}
