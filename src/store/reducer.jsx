import { defaultContext, SET_DEFAULT, SET_USER_DATA } from "./constants";

const reducer = (state, action) => {
	switch(action.type) {
		case SET_DEFAULT:
			return defaultContext;
		case SET_USER_DATA:
			return ({ ...state, user: action.payload })
		default:
			return state;
	}
};

export default reducer;