import { range } from 'lodash';
import * as React from 'react';
import { arrayToClass } from '../../../../uikit/libs/array-to-class';
import './grid.scss';

export class Grid extends React.Component<any, any> {

    public render(): React.ReactNode {
        return <div className={arrayToClass([this.props.className, 'grid-example'])}>
            <div className="row">
                {this.renderRow(1, 24)}
                {this.renderRow(2, 12)}
                {this.renderRow(3, 8)}
                {this.renderRow(4, 6)}
                {this.renderRow(6, 4)}
                {this.renderRow(8, 3)}
            </div>
        </div>;
    }

    private renderRow(numberOfItems: number, xs: number): React.ReactNode {
        return range(numberOfItems).map((item: number) => <div key={item} className={`col-24 col-sm-${xs} palette--bc-primary-5`}>
            <div className="example"/>
        </div>);
    }
}
