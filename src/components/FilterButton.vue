<template>
	<button class="filter mr-2 p-1 rounded-md inline-flex items-center space-x-2" :class="cssClass" @click.prevent="select">
		<span>{{ name }}</span>
		<span
			v-if="showBadge"
			class="inline-flex min-w-[1.5rem] justify-center rounded-full bg-yellow-400/90 px-2 text-xs font-semibold text-gray-900"
		>
			{{ badgeValue }}
		</span>
	</button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const emit = defineEmits(['selectRarity']);

const props = defineProps<{
	selected: string | number;
	rarity: string | number;
	name: string;
	badgeCount?: number;
	hideBadgeZero?: boolean;
}>();

const cssClass = computed(() => {
	const classes = [props.name.toLowerCase()];
	if (props.selected == props.rarity) classes.push('active');
	return classes;
});

const select = () => {
	emit('selectRarity', props.rarity);
};

const showBadge = computed(() => {
	if (props.badgeCount === undefined) return false;
	if (props.hideBadgeZero && props.badgeCount === 0) return false;
	return props.badgeCount > 0 || !props.hideBadgeZero;
});

const badgeValue = computed(() => props.badgeCount ?? 0);
</script>

<style scoped>
.filter {
	min-width: 4rem;
}
</style>
