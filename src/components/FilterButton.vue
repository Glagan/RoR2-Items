<template>
	<button class="filter mr-2 p-1 rounded-md" :class="cssClass" @click.prevent="select">
		{{ name }}
	</button>
</template>

<script lang="ts">
export default {
	props: {
		selected: { type: [String, Number], required: true },
		rarity: { type: [String, Number], required: true },
		name: { type: String, required: true },
	},
	methods: {
		select() {
			this.$emit('selectRarity', this.rarity);
		},
	},
	computed: {
		cssClass(): string[] {
			const classes = [this.name.toLowerCase()];
			if (this.selected == this.rarity) classes.push('active');
			return classes;
		},
	},
};
</script>

<style scoped>
.filter {
	min-width: 4rem;
}
</style>
