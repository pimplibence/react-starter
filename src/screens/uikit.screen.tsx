import * as React from 'react';
import { connect } from '../libs/connect';

const mapPropStates = (state: any) => ({});
const mapDispatchProps = (dispatch: (action: any) => void) => ({});

@connect(mapPropStates, mapDispatchProps)
export class UikitScreen extends React.Component<any, any> {

    public render() {
        return <div className="container">

            <h1>H1 Heading Text</h1>
            <h2>H2 Heading Text</h2>
            <h3>H3 Heading Text</h3>
            <h4>H4 Heading Text</h4>
            <h5>H5 Heading Text</h5>
            <h6>H6 Heading Text</h6>
            <p>Paragraph Text</p>
            <span>Span Text</span>
            <small>Small Text</small>

        </div>;
    }
}
