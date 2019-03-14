import * as React from 'react';
import { Button } from '../../../../uikit/components/button/button';
import { arrayToClass } from '../../../../uikit/libs/array-to-class';
import './buttons.scss';

export class Buttons extends React.Component<any, any> {

    public render(): React.ReactNode {
        return <div className={arrayToClass([this.props.className, 'button-example'])}>

            <Button title="btn-primary" className="btn-primary m-1"/>
            <Button title="btn-secondary" className="btn-secondary m-1"/>
            <Button title="btn-accent" className="btn-accent m-1"/>
            <Button title="btn-danger" className="btn-danger m-1"/>
            <Button title="btn-success" className="btn-success m-1"/>
            <Button title="btn-info" className="btn-info m-1"/>
            <Button title="btn-warning" className="btn-warning m-1"/>
            <Button title="btn-neutral" className="btn-neutral m-1"/>
            <Button title="btn-disable" className="btn-disable m-1"/>

        </div>;
    }
}
