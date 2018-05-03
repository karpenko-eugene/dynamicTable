import Vue from 'vue'
import Vuex from 'vuex'
import data from './data'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		data: data,
		searchText: "",
		perPage: 5,
		numPages: 1,
		curPage: 1,
		filteredData: [],
		orderBy: Object.keys(data[0])[0],
		orderDir: "asc"
	},

	getters: {
		fields(state) {
			return Object.keys(state.data[0]);
		},

		dataLength(state) {
			return state.data.length;
		},

		filteredDataLength(state) {
			return state.filteredData.length;
		},

		rows(state) {
			let fd = state.data
			.filter(e => Object.values(e).join("").toLowerCase().indexOf(state.searchText.toLowerCase()) > -1)
			.sort((a, b) => {
				let sign = state.orderDir == "asc" ? 1 : -1;
				if (typeof a[state.orderBy] == "number") {
					return sign * (a[state.orderBy] - b[state.orderBy]);
				} 
				else if (typeof a[state.orderBy] == "string") {
					return a[state.orderBy] > b[state.orderBy] ? 1*sign : -1*sign;
				}
				
			});
			state.filteredData = fd;
			state.numPages = Math.ceil(fd.length / state.perPage);

			return fd
			.slice((state.curPage-1)*state.perPage, state.curPage*state.perPage)

		},

		searchText(state) {
			return state.searchText;
		},

		perPage(state) {
			return state.perPage;
		},

		numPages(state) {
			return state.numPages;
		},

		curPage(state) {
			return state.curPage;
		},

		orderBy(state) {
			return state.orderBy;
		},

		orderDir(state) {
			return state.orderDir;
		}
	},

	mutations: {
	    set(state, {key, value}) {
	    	state[key] = value
	    }
	}

});

export default store;