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
		<div class="alert w-full mb-1 overflow-hidden bg-green-50 text-green-600 rounded-md shadow-md">
			<div class="p-4 flex items-center border-l-4 border-green-600 tracking-normal">
				<unicon class="mr-2" name="check-circle" width="36" height="36" fill="#059669"></unicon>
				Up to date with version <b class="inline-block mx-1">1.0.3.1</b> (December 15th 2020).
				<a
					:href="updateLink"
					rel="noreferrer noopener"
					target="_blank"
					class="flex items-center mx-1 text-blue-600"
				>
					<unicon
						name="steam"
						class="mr-1"
						width="20"
						height="20"
						viewBox="0 0 233 233"
						fill="inherit"
					></unicon>
					Last patch
					<unicon name="external-link-alt" class="ml-1" width="16" height="16" fill="#2563EB"></unicon>
				</a>
			</div>
		</div>
		<form class="flex flex-col flex-wrap sticky top-0 py-2 bg-gray-600 shadow-b" @submit.prevent="">
			<div class="flex flex-row flex-nowrap mb-2">
				<FilterButton rarity="all" name="All" :selected="selectedRarity" v-on:selectRarity="selectRarity" />
				<FilterButton
					v-for="(item, index) in rarities"
					:rarity="index"
					:name="item"
					:key="index"
					:selected="selectedRarity"
					v-on:selectRarity="selectRarity"
				/>
			</div>
			<div class="flex flew-row flex-nowrap">
				<button
					class="rounded-l-md bg-red-600 text-white border-2 border-red-700 py-1 px-2 focus:border-red-800 focus:ring focus:ring-red-800"
					@click.prevent="clearFilter"
				>
					Clear
				</button>
				<input
					class="flex-grow text-black placeholder-gray-500 border border-gray-200 rounded-r-md p-2 focus:border-blue-800 focus:ring focus:ring-blue-800"
					v-model="strFilter"
					placeholder="Search name, tags, rarity and description"
					@keydown.enter.prevent=""
				/>
			</div>
		</form>
		<div class="body flex flex-row flex-wrap items-start justify-around mt-1">
			<template v-if="items.length > 0">
				<Item v-for="item in items" :key="item.uid" :item="item" v-on:showModal="showModal" />
			</template>
			<template v-else>
				<div class="alert w-full mb-1 overflow-hidden bg-blue-50 text-blue-600 rounded-md shadow-md">
					<div class="p-4 flex items-center border-l-4 border-blue-600 tracking-normal">
						<unicon class="mr-2" name="info-circle" width="36" height="36" fill="#2563EB"></unicon>
						No Items found.
					</div>
				</div>
			</template>
		</div>
	</div>
	<Modal ref="modal" />
</template>

<script lang="ts">
import Item from './components/Item.vue';
import Modal from './components/Modal.vue';
import list from './assets/list.json';
import { Rarity } from './definition';
import FilterButton from './components/FilterButton.vue';

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
	components: { FilterButton, Item, Modal },
	data() {
		return {
			list: [],
			lunarEquipments: [3, 23, 26],
			strFilter: '',
			rarityFilter: 'all',
			updateLink: 'https://store.steampowered.com/news/app/632360/view/2927867089366037940',
			rarities: ['Common', 'Uncommon', 'Rare', 'Unique', 'Lunar', 'Equipment'],
		} as {
			list: ItemDescription[];
			lunarEquipments: number[];
			strFilter: string;
			rarityFilter: 'all' | Rarity;
			updateLink: string;
			rarities: string[];
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
			this.strFilter = '';
		},
		selectRarity(type: 'all' | Rarity) {
			this.rarityFilter = type;
		},
		showModal(item: ItemDescription) {
			(this.$refs.modal as typeof Modal).show(item);
		},
	},
	computed: {
		items(): ItemDescription[] {
			return this.list.filter((item: ItemDescription) => {
				return (
					(this.strFilter == '' ||
						item.name.indexOf(this.strFilter) >= 0 ||
						item.tags.indexOf(this.strFilter) >= 0 ||
						item.uid.indexOf(this.strFilter) >= 0 ||
						item.description.indexOf(this.strFilter) >= 0 ||
						item.image.indexOf(this.strFilter) >= 0 ||
						item.stringRarity.indexOf(this.strFilter) >= 0) &&
					(this.rarityFilter == 'all' || this.rarityFilter == item.rarity)
				);
			});
		},
		selectedRarity(): 'all' | Rarity {
			return this.rarityFilter;
		},
	},
};
</script>
