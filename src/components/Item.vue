<template>
	<div
		class="flex flex-col flex-nowrap overflow-hidden w-full lg:w-48p xl:w-32p mb-4 rounded-md rounded-bl-none border shadow-md transition hover:shadow-xl"
		:class="[border, background]"
	>
		<div class="flex items-center content-center justify-between p-2 text-xl border-b" :class="[border]">
			{{ item.name }}
			<div>
				<button
					class="p-1 mr-1 rounded-md text-sm border border-blue-800 bg-blue-600 transition hover:border-blue-900 hover:bg-blue-700"
					v-if="item.unlock"
					@click.prevent="toggleModal"
				>
					Unlock
				</button>
				<span v-if="item.id >= 0">#{{ item.id }}</span>
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

const props = defineProps<{ item: ItemDescription }>();

const emit = defineEmits(['showModal']);

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
</script>

<style scoped>
.item-body {
	height: 90px;
}
</style>
