import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Rating } from 'semantic-ui-react';
import { connect } from '../libs/connect';

const mapPropStates = (state: any) => ({});
const mapDispatchProps = (dispatch: (action: any) => void) => ({});

@connect(mapPropStates, mapDispatchProps)
export class HomeScreen extends React.Component<any, any> {
    public render() {
        return <div>
            <h3>Home Screen</h3>
            <Rating rating={1} maxRating={5}/>
            <Button size='small' color='green'>
                <Icon name='download' />
                Download
            </Button>
            <Link to={'/profile'}>To Profile</Link>
        </div>;
    }
}
