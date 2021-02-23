<template>
	<div class="container w-9/12 mx-auto p-2">
		<h1 class="header flex flex-row items-stretch justify-between text-5xl mb-4">
			Risk of Rain 2 Items &amp; Equipments
			<div class="flex items-center">
				<a href="https://ko-fi.com/Y8Y32X73U" target="_blank">
					<img
						height="36"
						style="border: 0px; height: 36px"
						src="https://cdn.ko-fi.com/cdn/kofi1.png?v=2"
						border="0"
						alt="Buy Me a Coffee at ko-fi.com"
					/>
				</a>
				<a href="https://github.com/Glagan/RoR2-Items" rel="noreferrer noopener">
					<unicon name="github" width="48" height="48" fill="white"></unicon>
				</a>
			</div>
		</h1>
		<div class="w-full mb-1 overflow-hidden bg-green-50 text-green-600 rounded-md shadow-md">
			<div class="p-4 flex items-center border-l-4 border-green-600 tracking-normal">
				<unicon class="mr-2" name="check-circle" width="28" height="28" fill="#059669"></unicon>
				Up to date with version <b class="inline-block mx-1">1.0.3.1</b> (December 15th 2020).
				<a
					:href="updateLink"
					rel="noreferrer noopener"
					target="_blank"
					class="flex items-center mx-1 text-blue-600"
				>
					Last patch
					<unicon name="external-link-alt" class="ml-1" width="16" height="16" fill="#2563EB"></unicon>
				</a>
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
			<Item v-for="(item, index) in items" :key="index" :item="item" v-on:showModal="showModal" />
		</div>
	</div>
	<Modal ref="modal" />
</template>

<script lang="ts">
import Item from './components/Item.vue';
import Modal from './components/Modal.vue';
import list from './assets/list.json';

/**
 * Additional hidden equipments:
 *	[5, 5, 'AffixRed', 'Ifrit\'s Distinction', 'offense,fire,drop', 'fireAspect', 'Become an aspect of fire.', 'Drop from Fire Elite enemies.'],
 *	[6, 5, 'AffixBlue', 'Silent Between Two Strikes', 'offense,lightning,drop', 'lightningAspect', 'Become an aspect of lightning.', 'Drop from Lightning Elite enemies.'],
 *	[9, 5, 'AffixWhite', 'Her Biting Embrace', 'offense,ice,drop', 'iceAspect', 'Become an aspect of ice.', 'Drop from Ice Elite enemies.'],
 *	[10, 5, 'AffixPoison', 'N\'kuhana\'s Retort', 'offense,malachite,debuff,heal', 'affixMalachite', 'Become an aspect of corruption.', 'Drop from Malachite Elite enemies.'],
 *	[32, 5, 'AffixHaunted', 'Affix Haunted', 'utility,defense,haunted,elite,drop', 'whiteSquare', 'Become an haunted aspect.\n{misc:(No in-game image yet)}', 'Drop from Haunter Elite enemies.'],
 *	[29, 5, 'QuestVolatileBattery', 'Fuel Array', 'quest', 'fuelArray', 'Looks like it could power something.\n{offense:EXTREMELY unstable...}.\n{misc:(Not obtainable in-game, used for quest)}'],
 */

export default {
	components: { Item, Modal },
	data() {
		return {
			list: [],
			lunarEquipments: [3, 23, 26],
			filter: '',
			updateLink: 'https://store.steampowered.com/news/app/632360/view/2927867089366037940',
		} as {
			list: ItemDescription[];
			lunarEquipments: number[];
			filter: string;
			updateLink: string;
		};
	},
	created() {
		this.load();
	},
	methods: {
		rarityToString(rarity: Rarity): string {
			switch (rarity) {
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
		load() {
			for (const i of list) {
				const item = i as RawItemDescription;
				this.list.push({
					id: item[0],
					rarity: item[1],
					stringRarity: this.rarityToString(item[1]),
					uid: item[2],
					name: item[3],
					tags: item[4],
					image: item[5],
					description: item[6],
					unlock: item[7],
				});
			}
		},
		clearFilter() {
			this.filter = '';
		},
		showModal(item: ItemDescription) {
			(this.$refs.modal as typeof Modal).show(item);
		},
	},
	computed: {
		items(): ItemDescription[] {
			return this.list.filter((item: ItemDescription) => {
				return (
					item.name.indexOf(this.filter) >= 0 ||
					item.tags.indexOf(this.filter) >= 0 ||
					item.uid.indexOf(this.filter) >= 0 ||
					item.description.indexOf(this.filter) >= 0 ||
					item.image.indexOf(this.filter) >= 0 ||
					item.stringRarity.indexOf(this.filter) >= 0
				);
			});
		},
	},
};
</script>
