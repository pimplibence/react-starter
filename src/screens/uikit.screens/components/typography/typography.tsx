import * as React from 'react';
import './typography.scss';

export class Typography extends React.Component<any, any> {

    public render(): React.ReactNode {
        return <div className={this.props.className}>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>

            <p>Paragraph style</p>

            <div className="w-100">
                <span>Span style</span>
            </div>

            <div className="w-100">
                <small>Small style</small>
            </div>

            <div className="w-100">
                <label>Label style</label>
            </div>
        </div>;
    }
}
