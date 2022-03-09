<template>
	<button class="filter mr-2 p-1 rounded-md" :class="cssClass" @click.prevent="select">
		{{ name }}
	</button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const emit = defineEmits(['selectRarity']);

const props = defineProps<{
	selected: string | number;
	rarity: string | number;
	name: string;
}>();

const cssClass = computed(() => {
	const classes = [props.name.toLowerCase()];
	if (props.selected == props.rarity) classes.push('active');
	return classes;
});

const select = () => {
	emit('selectRarity', props.rarity);
};
</script>

<style scoped>
.filter {
	min-width: 4rem;
}
</style>
