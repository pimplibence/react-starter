export abstract class RepositoryFactory {

    public static initialState() {
        return {
            error: null,
            isLoading: false,
            payload: null,
            query: null
        };
    }

    public static successAction(actionsName: string, payload: any) {
        return {
            type: actionsName,
            value: {
                isLoading: false,
                payload: payload
            }
        };
    }

    public static errorAction(actionsName: string, error: any) {
        return {
            type: actionsName,
            value: {
                error: error,
                isLoading: false,
            }
        };
    }

    public static startAction(actionsName: string, query?: any) {
        return {
            type: actionsName,
            value: {
                isLoading: true,
                query: query || null
            }
        };
    }

    public static createRepositoryReducer(actionName: string) {
        return (state: any = RepositoryFactory.initialState(), action: any) => {
            return { ...state, ...action.value };
        };
    }
}
