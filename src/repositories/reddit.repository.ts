import axios from 'axios';
import { combineReducers, Reducer } from 'redux';
import { RepositoryFactory } from './repository-factory';

export abstract class RedditRepository {
    public static FETCH = 'Repository(FETCH)';

    public static list() {
        return async (dispatch: any) => {
            try {
                dispatch(RepositoryFactory.startAction(this.FETCH));
                const response = await axios.get('https://www.reddit.com/r/programmerhumor.json');
                dispatch(RepositoryFactory.successAction(this.FETCH, response.data));
            } catch (err) {
                dispatch(RepositoryFactory.errorAction(this.FETCH, err));
            }
        };
    }

    public static getReducer(): Reducer<any> {
        return combineReducers({
            list: RepositoryFactory.createRepositoryReducer(this.FETCH)
        });
    }

}
