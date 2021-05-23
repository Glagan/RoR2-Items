<template>
	<div class="container w-9/12 mx-auto p-2">
		<div class="mb-4 flex flex-row flex-nowrap justify-between items-center">
			<div>
				<a
					title="Github Repository"
					target="_blank"
					href="https://github.com/Glagan/RoR2-Items"
					rel="noreferrer noopener"
				>
					<span class="inline-block w-full text-lg text-gray-400">Glagan</span>
					<span class="flex flex-row flex-nowrap items-center text-xl text-gray-200">
						Risk of Rain 2 Items & Equipments
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="white"
							class="inline-block align-middle ml-1"
						>
							<path
								d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"
							></path>
						</svg>
					</span>
				</a>
			</div>
			<div class="hidden md:block">
				<a href="https://ko-fi.com/Y8Y32X73U" target="_blank">
					<img
						height="36"
						style="border: 0px; height: 36px"
						src="https://cdn.ko-fi.com/cdn/kofi1.png?v=2"
						border="0"
						alt="Buy Me a Coffee at ko-fi.com"
					/>
				</a>
			</div>
		</div>
		<UpdateAlert />
		<form class="search flex flex-col flex-wrap sticky top-0 py-2 bg-gray-700 shadow-b" @submit.prevent="">
			<div class="flex flex-row flex-wrap mb-2">
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
						<InformationCircleIcon class="mr-2 w-9 h-9 text-blue-600" />
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
import Rarity from './Rarity';
import FilterButton from './components/FilterButton.vue';
import UpdateAlert from './components/UpdateAlert.vue';
import { InformationCircleIcon } from '@heroicons/vue/outline';

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
	components: { FilterButton, Item, Modal, UpdateAlert, InformationCircleIcon },
	data() {
		return {
			list: [],
			lunarEquipments: [3, 23, 26],
			strFilter: '',
			rarityFilter: 'all',
			rarities: ['Common', 'Uncommon', 'Rare', 'Unique', 'Lunar', 'Equipment'],
		} as {
			list: ItemDescription[];
			lunarEquipments: number[];
			strFilter: string;
			rarityFilter: 'all' | Rarity;
			rarities: string[];
		};
	},
	created() {
		this.load();
	},
	methods: {
		rarityToString(rarity: Rarity): string {
			switch (rarity) {
				case Rarity.COMMON:
					return 'common';
				case Rarity.UNCOMMON:
					return 'uncommon';
				case Rarity.RARE:
					return 'rare';
				case Rarity.UNIQUE:
					return 'unique';
				case Rarity.LUNAR:
					return 'lunar';
			}
			//case Rarity.EQUIPMENT:
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
