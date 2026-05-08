export type FilterState = {
	language: string;
};

export type FilterAction =
	| { type: 'SET_LANGUAGE'; payload: string }
	| { type: 'RESET' };

export const initialState = {
	language: 'javascript',
};

export function filterReducer(state: FilterState, action: FilterAction): FilterState {
    switch (action.type) {
        case 'SET_LANGUAGE':
            return {...state, language: action.payload }
        case 'RESET':
            return initialState
        default:
            return state
    }
}