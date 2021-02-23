<template>
	<div
		class="flex flex-col flex-nowrap overflow-hidden w-32 mb-4 rounded-md border shadow-md"
		:class="[border, background]"
	>
		<div class="flex items-center justify-between p-2 text-xl border-b" :class="[border]">
			{{ item.name }} <span v-if="item.id">#{{ item.id }}</span>
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
			/*.then(() => {
					SimpleNotification.success(
						'Copied',
						['**', this.name, '** give command has been copied.'].join(''),
						imageSrc,
						{ duration: 1200, position: 'bottom-left' }
					);
				})
				.catch((error) => {
					SimpleNotification.error(
						'Error',
						['Could not copy the give command:\n', error].join(''),
						imageSrc,
						{ duration: 1200, position: 'bottom-left' }
					);
				});*/
		},
	},
	computed: {
		isLunarEquipment(): boolean {
			return this.$store.state.lunarEquipments.indexOf(this.item.id) >= 0;
		},
		rarity(): string {
			switch (this.item.rarity) {
				case 0:
					return 'common';
				case 1:
					return 'uncommon';
				case 2:
					return 'rare';
				case 3:
					return 'unique';
				case 4:
					return 'lunar';
			}
			//case 5:
			return 'equipment';
		},
		border(): string {
			return `border-${this.rarity}`;
		},
		background(): string {
			return `bg-${this.rarity}`;
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
