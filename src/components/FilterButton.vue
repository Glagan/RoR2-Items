<template>
	<button type="button" class="filter chip" :class="cssClass" :aria-pressed="isSelected" @click.prevent="select">
		<svg v-if="isTracked" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
			<path
				d="M11.48 3.5a.56.56 0 0 1 1.04 0l2.13 5.11a.56.56 0 0 0 .47.35l5.52.44c.5.04.7.66.32.99l-4.2 3.54a.56.56 0 0 0-.18.56l1.28 5.38a.56.56 0 0 1-.84.61l-4.72-2.88a.56.56 0 0 0-.59 0l-4.72 2.88a.56.56 0 0 1-.84-.61l1.28-5.38a.56.56 0 0 0-.18-.56l-4.2-3.54a.56.56 0 0 1 .32-.99l5.52-.44a.56.56 0 0 0 .47-.35l2.13-5.11Z"
			/>
		</svg>
		<span v-else class="pip" aria-hidden="true"></span>
		<span>{{ name }}</span>
		<span v-if="showBadge" class="badge">{{ badgeValue }}</span>
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

const isTracked = computed(() => props.name === 'Tracked');
const isSelected = computed(() => props.selected == props.rarity);
const cssClass = computed(() => (isTracked.value ? 'tracked' : `r-${props.name.toLowerCase()}`));

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
