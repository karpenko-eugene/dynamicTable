<template>
	<div class="table-app">
		<div class="app-header">
			<showItems />
			<searchItems />
		</div>
		<table>
			<thead>
				<tr>
					<th :class="{sortAsc: orderBy==field&&orderDir=='asc', sortDesc: orderBy==field&&orderDir=='desc'}" v-for="field in fields" @click="setOrderBy(field)">{{field}}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="row in rows">
					<td v-for="data in row">{{data}}</td>
				</tr>
			</tbody>
		</table>
		<div class="app-footer">
			<div v-if="this.$store.getters.dataLength==this.$store.getters.filteredDataLength">
				Showing {{(this.$store.getters.curPage-1)*this.$store.getters.perPage + 1}} to {{this.$store.getters.curPage!=this.$store.getters.numPages?this.$store.getters.curPage*this.$store.getters.perPage:this.$store.getters.dataLength}} of {{this.$store.getters.dataLength}} entries
			</div>
			<div v-else>
				Showing {{(this.$store.getters.curPage-1)*this.$store.getters.perPage + 1}} to {{this.$store.getters.curPage!=this.$store.getters.numPages?this.$store.getters.curPage*this.$store.getters.perPage:this.$store.getters.filteredDataLength}} of {{this.$store.getters.filteredDataLength}} entries (filtered from {{this.$store.getters.dataLength}} total entries)
			</div>
			<pagination />
		</div>
	</div>
</template>

<script>
	import showItems from './showItems.vue'
	import searchItems from './searchItems.vue'
	import pagination from './pagination.vue'

	export default {
		components: {
			showItems, searchItems, pagination
		},

		methods: {
			setOrderBy(field) {
				if (field == this.orderBy) {
					console.log("erwe");
					if (this.orderDir == "asc") {
						this.$store.commit('set', {key: 'orderDir', value: "desc"});
					} else {
						this.$store.commit('set', {key: 'orderDir', value: "asc"});
					}
				}
				this.$store.commit('set', {key: 'orderBy', value: field});
			}
		},

		computed: {
			fields() {
				return this.$store.getters.fields
			},

			rows() {
				return this.$store.getters.rows
			},

			orderBy() {
				return this.$store.getters.orderBy
			},

			orderDir() {
				return this.$store.getters.orderDir
			}
		}
	}
</script>

<style>
	* {
		box-sizing: border-box;
		color: #73879C;
		font-size: 14px;
	}

	table {
		border-collapse: collapse;
		width: 100%;
		margin-bottom: 5px;
	}

	tbody tr:nth-child(odd){
		background-color: #f9f9f9;
	}

	th {
		text-align: left;
		border: 1px solid #ddd;
		border-bottom: 3px solid #ddd;
		font-family: 'Glyphicons Halflings';
		position: relative;
		cursor: pointer;
	}

	th::after {
		content: "\e150";
		position: absolute;
    	top: 12px;
    	right: 8px;
    	display: block;
    	opacity: 0.2;
    	font-size: .7em;
	}

	th.sortAsc::after {
		content: "\e155";
		opacity: 0.8;
	}

	th.sortDesc::after {
		content: "\e156";
		opacity: 0.8;
	}

	td {
		border: 1px solid #ddd;
	}

	td, th {
		padding: 8px 30px 8px 8px;
	}

	.app-header, .app-footer {
		display: flex;
		justify-content: space-between;
		padding: 8px 2px;
	}
</style>