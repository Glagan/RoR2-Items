<template>
	<div
		class="flex flex-col flex-nowrap overflow-hidden w-full lg:w-48p xl:w-32p mb-4 rounded-md rounded-bl-none border shadow-md transition hover:shadow-xl"
		:class="[border, background]"
	>
		<div class="flex items-center content-center justify-between p-2 text-xl border-b" :class="[border]">
			<span class="mr-2 truncate">{{ item.name }}</span>
			<div class="flex items-center space-x-1">
				<button
					class="p-1 mr-1 rounded-md text-sm border border-blue-800 bg-blue-600 transition hover:border-blue-900 hover:bg-blue-700"
					v-if="item.unlock"
					@click.prevent="toggleModal"
				>
					Unlock
				</button>
				<span v-if="item.id >= 0">#{{ item.id }}</span>
				<button
					type="button"
					:class="starButtonClass"
					:aria-pressed="tracked"
					:aria-label="trackingLabel"
					:title="trackingTitle"
					@click.stop="handleToggleTracked"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="h-4 w-4"
						:fill="tracked ? 'currentColor' : 'none'"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.54a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.48a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.54a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345l2.125-5.111Z"
						/>
					</svg>
				</button>

			</div>
		</div>
		<div class="item-body flex flex-row flex-nowrap">
			<div v-lazyload class="flex-grow-0 flex-shrink-0 border-r" :class="[border]">
				<img
					title="Click to copy give command"
					width="90"
					height="90"
					:data-url="`img/${item.image}.jpg`"
					@click="copyGive"
				/>
			</div>
			<div class="flex-grow p-1 overflow-y-auto whitespace-pre-line" v-html="description"></div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Rarity from '../Rarity';

const props = withDefaults(defineProps<{ item: ItemDescription; tracked?: boolean }>(), {
	tracked: false,
});

const emit = defineEmits<{
	(event: 'showModal', item: ItemDescription): void;
	(event: 'toggleTracked', uid: ItemUid): void;
}>();

const isLunarEquipment = computed(() => {
	return false; // return this.$store.state.lunarEquipments.indexOf(this.item.id) >= 0;
});

const border = computed(() => {
	switch (props.item.rarity) {
		case Rarity.COMMON:
			return `border-common-light`;
		case Rarity.UNCOMMON:
			return `border-uncommon-light`;
		case Rarity.RARE:
			return `border-rare-light`;
		case Rarity.UNIQUE:
			return `border-unique-light`;
		case Rarity.CORRUPTED:
			return `border-corrupted-light`;
		case Rarity.LUNAR:
			return `border-lunar-light`;
	}
	// case Rarity.EQUIPMENT:
	return `border-equipment-light`;
});

const background = computed(() => {
	switch (props.item.rarity) {
		case Rarity.COMMON:
			return `bg-common`;
		case Rarity.UNCOMMON:
			return `bg-uncommon`;
		case Rarity.RARE:
			return `bg-rare`;
		case Rarity.UNIQUE:
			return `bg-unique`;
		case Rarity.CORRUPTED:
			return `bg-corrupted`;
		case Rarity.LUNAR:
			return `bg-lunar`;
	}
	// case Rarity.EQUIPMENT:
	return `bg-equipment`;
});

const description = computed(() => {
	return props.item.description
		.replaceAll(/{(offense|defense|debuff|misc|corrupt):(.+?)}/g, `<span class="is-$1">$2</span>`)
		.replaceAll(/{(.+?)\$}/g, `<span class="is-stackable not-per-stack">$1</span>`)
		.replaceAll(/{(.+?)\|(.+?)}/g, `<span class="is-stackable">($1 $2)</span>`)
		.replaceAll(/{(.+?)}/g, `<span class="is-stackable">($1 per stack)</span>`);
});

const trackingTitle = computed(() => (props.tracked ? 'Untrack item' : 'Track item'));
const trackingLabel = computed(() => `${props.tracked ? 'Untrack' : 'Track'} ${props.item.name}`);
const starButtonClass = computed(() => {
	const classes = [
		'inline-flex',
		'h-8',
		'w-8',
		'items-center',
		'justify-center',
		'rounded-xl',
		'transition',
		'focus:outline-none',
		'focus:ring-2',
		'focus:ring-offset-2',
		'focus:ring-yellow-500',
		'focus:ring-offset-gray-900',
		'ring-1',
		'ring-offset-1',
	];
	if (props.tracked) {
		classes.push('bg-yellow-100', 'text-yellow-700', 'hover:bg-yellow-200', 'hover:text-yellow-800', 'ring-yellow-500/60');
	} else {
		classes.push('bg-gray-700/40', 'text-gray-300', 'hover:bg-gray-600/70', 'hover:text-yellow-500', 'ring-gray-500/30');
	}
	return classes.join(' ');
});

const copyGive = () => {
	let command = 'give_item';
	if (props.item.rarity == Rarity.EQUIPMENT || (props.item.rarity == Rarity.LUNAR && isLunarEquipment.value)) {
		command = 'give_equip';
	}
	navigator.clipboard.writeText(`${command} ${props.item.id} 1`);
};

const toggleModal = () => {
	emit('showModal', props.item);
};

const handleToggleTracked = () => {
	emit('toggleTracked', props.item.uid);
};
</script>

<style scoped>
.item-body {
	height: 90px;
}
</style>
