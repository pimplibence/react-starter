import * as React from 'react';
import { connect } from '../libs/connect';
import { RedditRepository } from '../repositories/reddit.repository';

const mapPropStates = (state: any) => ({
    list: state.repository.reddit.list
});

const mapDispatchProps = (dispatch: (action: any) => void) => ({
    fetchList: () => dispatch(RedditRepository.list())
});

@connect(mapPropStates, mapDispatchProps)
export class HomeScreen extends React.Component<any, any> {
    public render() {
        return <div>
            <code>{JSON.stringify(this.props.list)}</code>
            <button onClick={() => this.props.fetchList()}>Fetch Bro!!</button>
        </div>;
    }
}
