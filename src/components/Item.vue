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
				<span v-if="item.id">#{{ item.id }}</span>
			</div>
		</div>
		<div class="item-body flex flex-row flex-nowrap">
			<div class="flex-grow-0 flex-shrink-0 border-r" :class="[border]">
				<img
					:src="`img/${item.image}.png`"
					title="Click to copy give command"
					width="90"
					height="90"
					@click="copyGive"
				/>
			</div>
			<div class="flex-grow p-1 overflow-y-auto" v-html="description"></div>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	props: {
		item: { type: Object, required: true },
	},
	methods: {
		copyGive() {
			let command = 'give_item';
			if (this.item.rarity == 5 || (this.item.rarity == 4 && this.isLunarEquipment)) {
				command = 'give_equip';
			}
			navigator.clipboard.writeText(`${command} ${this.item.id} 1`);
		},
		toggleModal() {
			this.$emit('showModal', this.item);
		},
	},
	computed: {
		isLunarEquipment(): boolean {
			return false; // return this.$store.state.lunarEquipments.indexOf(this.item.id) >= 0;
		},
		border(): string {
			return `border-${this.item.stringRarity}-light`;
		},
		background(): string {
			return `bg-${this.item.stringRarity}`;
		},
		description(): string {
			return this.item.description
				.replaceAll(/{(offense|defense|debuff|misc):(.+?)}/g, `<span class="is-$1">$2</span>`)
				.replaceAll(/{(.+?)}/g, `<span class="is-stackable">($1 per stack)</span>`);
		},
	},
};
</script>

<style scoped>
.item-body {
	height: 90px;
}
</style>
