export default {
	items: {
		loading: false,
		items: [],
		favourites: []
	},
	authReducer: {
		token: null,
		authenticated: false,
		currentUser: null,
		err: null,
	},
	jobsReducer: {
		loading: false,
		list: [],
		err: null
,	}
};