// tslint:disable variable-name
import './scss/uikit';

export abstract class Uikit {
    public static boot() {
        //
    }

    /**
     * Text input
     * Number input
     * Email input
     * Password input
     */
    public static Input = () => 'Component';

    /**
     * Textarea input
     * @constructor
     */
    public static Textarea = () => 'Component';

    /**
     * Select input
     * Multi Select input
     * Search Single input
     * Multi select input
     * OnCreate Single input
     * OnCreate Multi Select input
     * @constructor
     */
    public static Select = () => 'Component';

    /**
     * Simple Input
     * @constructor
     */
    public static Button = () => 'Component';

    /**
     * Badge / Tag
     * @constructor
     */
    public static Badge = () => 'Component';

}
