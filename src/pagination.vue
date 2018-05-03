<template>
	<nav>
		<ul v-if="numPages <= 6">
			<li>
				<a href="#" v-if="curPage!=1" @click="prevPage($event)">Previous</a>
				<span v-else class="disabled">Previous</span>
			</li>
			<li v-for="n in numPages">
				<a href="#" v-if="curPage!=n" @click="setCurPage($event, n)">{{n}}</a>
				<span v-else class="active">{{n}}</span>
			</li>
			<li>
				<a href="#" v-if="curPage!=numPages" @click="nextPage($event)">Next</a>
				<span v-else class="disabled">Next</span>
			</li>
		</ul>
		<ul v-else-if="numPages > 6 && curPage <=4 ">
			<li>
				<a href="#" v-if="curPage!=1" @click="prevPage($event)">Previous</a>
				<span v-else class="disabled">Previous</span>
			</li>
			<li v-for="n in 5">
				<a href="#" v-if="curPage!=n" @click="setCurPage($event, n)">{{n}}</a>
				<span v-else class="active">{{n}}</span>
			</li>
			<li>
				<span class="disabled">...</span>
			</li>
			<li>
				<a href="#" @click="setCurPage($event, numPages)">{{numPages}}</a>
			</li>
			<li>
				<a href="#" v-if="curPage!=numPages" @click="nextPage($event)">Next</a>
				<span v-else class="disabled">Next</span>
			</li>	
		</ul>
		<ul v-else-if="numPages > 6 && curPage > (numPages - 4) ">
			<li>
				<a href="#" v-if="curPage!=1" @click="prevPage($event)">Previous</a>
				<span v-else class="disabled">Previous</span>
			</li>
			<li>
				<a href="#" @click="setCurPage($event, 1)">1</a>
			</li>
			<li>
				<span class="disabled">...</span>
			</li>
			<li v-for="n in [numPages-4, numPages-3, numPages-2, numPages-1, numPages]">
				<a href="#" v-if="curPage!=n" @click="setCurPage($event, n)">{{n}}</a>
				<span v-else class="active">{{n}}</span>
			</li>
			<li>
				<a href="#" v-if="curPage!=numPages" @click="nextPage($event)">Next</a>
				<span v-else class="disabled">Next</span>
			</li>	
		</ul>
		<ul v-else>
			<li>
				<a href="#" v-if="curPage!=1" @click="prevPage($event)">Previous</a>
				<span v-else class="disabled">Previous</span>
			</li>
			<li>
				<a href="#" @click="setCurPage($event, 1)">1</a>
			</li>
			<li>
				<span class="disabled">...</span>
			</li>
			<li v-for="n in [curPage-1, curPage, curPage+1]">
				<a href="#" v-if="curPage!=n" @click="setCurPage($event, n)">{{n}}</a>
				<span v-else class="active">{{n}}</span>
			</li>
			<li>
				<span class="disabled">...</span>
			</li>
			<li>
				<a href="#" @click="setCurPage($event, numPages)">{{numPages}}</a>
			</li>
			<li>
				<a href="#" v-if="curPage!=numPages" @click="nextPage($event)">Next</a>
				<span v-else class="disabled">Next</span>
			</li>	
		</ul>
	</nav>
</template>

<script>
	export default {
		
		computed: {
			numPages() {
				return this.$store.getters.numPages;
			},

			curPage() {
				return this.$store.getters.curPage;
			}
		},

		methods: {
			setCurPage(e, n) {
				e.preventDefault();
				this.$store.commit('set', {key: 'curPage', value: n});
			},

			prevPage(e) {
				e.preventDefault();
				this.$store.commit('set', {key: 'curPage', value: this.curPage - 1});
			},

			nextPage(e) {
				e.preventDefault();
				this.$store.commit('set', {key: 'curPage', value: this.curPage + 1});
			}
		}
	}
</script>

<style>
	nav {
		background-color: #ddd;
		border-radius: 5px;
	}

	nav ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	nav ul li {
		display: inline-block;
	}

	nav ul li a {
		padding: 7px 8px;
		display: block;
		text-decoration: none;
		color: #337ab7;
	}

	nav ul li span {
		padding: 7px 8px;
		display: block;
	}

	nav ul li span.active {
		color: #fff;
	}

	nav ul li span.disabled {
		color: #777;
    	cursor: not-allowed;
	}

</style>