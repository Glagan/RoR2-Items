<template>
	<div class="container w-9/12 mx-auto p-2">
		<h1 class="header flex flex-row items-center justify-between text-5xl mb-4">
			Risk of Rain 2 Items &amp; Equipments
			<a href="https://github.com/Glagan/RoR2-Items" rel="noreferrer noopener">
				<unicon name="github" width="48" height="48" fill="white"></unicon>
			</a>
		</h1>
		<div class="w-full mb-1 overflow-hidden bg-green-50 text-green-600 rounded-md shadow-md">
			<div class="p-4 flex items-center border-l-4 border-green-600 tracking-normal">
				<unicon class="mr-2" name="check-circle" width="28" height="28" fill="#059669"></unicon>
				Up to date with version <b>1.0.1.1</b> (September 1st 2020).
			</div>
		</div>
		<form class="flex flex-nowrap sticky top-0 py-3 bg-gray-700 shadow-b" @submit.prevent="">
			<button
				class="rounded-l-md bg-red-600 text-white border-2 border-red-700 py-1 px-2"
				@click.prevent="clearFilter"
			>
				Clear
			</button>
			<input
				class="flex-grow text-black placeholder-gray-500 border border-gray-200 rounded-r-md p-2 focus:border-light-blue-500 focus:ring-2 focus:ring-light-blue-500"
				v-model="filter"
				@keydown.enter.prevent=""
			/>
		</form>
		<div class="body flex flex-row flex-wrap items-start justify-around mt-1">
			<Item v-for="(item, index) in items" :key="index" :item="item" />
		</div>
	</div>
	<Modal />
</template>

<script lang="ts">
import Item from './components/Item.vue';
import Modal from './components/Modal.vue';
import store from './store';

export default {
	components: { Item, Modal },
	store,
	created() {
		this.$store.dispatch('load');
	},
	methods: {
		clearFilter() {
			this.filter = '';
		},
	},
	computed: {
		items() {
			return this.$store.getters.filteredList;
		},
		filter: {
			get(): string {
				return this.$store.state.filter;
			},
			set(value: string) {
				this.$store.commit('updateFilter', value);
			},
		},
	},
};
</script>

<style></style>
