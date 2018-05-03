import Vue from 'vue'
import store from './store'
import Table from './Table.vue'

new Vue({
	el: '#app',
	render: h => h(Table),
	store
})
