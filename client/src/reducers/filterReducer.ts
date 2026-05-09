export type FilterState = {
	language: string;
	per_page: number;
	page: number;
};

export type FilterAction =
	| { type: 'SET_LANGUAGE'; payload: string }
	| { type: 'PER_PAGE'; payload: number }
	| { type: 'NEXT_PAGE' }
	| { type: 'PREV_PAGE' }
	| { type: 'SET_PAGE'; payload: number }
	| { type: 'RESET' };

export const initialState: FilterState = {
	language: 'javascript',
	per_page: 28,
	page: 1,
};

export function filterReducer(
	state: FilterState,
	action: FilterAction,
): FilterState {
	switch (action.type) {
		case 'SET_LANGUAGE':
			return { ...state, language: action.payload };
		case 'PER_PAGE':
			return { ...state, per_page: action.payload };
		case 'NEXT_PAGE':
			return { ...state, page: state.page + 1 };
		case 'PREV_PAGE':
			return { ...state, page: Math.max(state.page - 1) };
		case 'SET_PAGE':
			return { ...state, page: action.payload };
		case 'RESET':
			return initialState;
		default:
			return state;
	}
}
