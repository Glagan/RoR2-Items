import { Item } from 'vue';
import { createStore } from 'vuex';
import list from '../assets/list.json';

/**
 * list.json format:
 * 	id
 * 	rarity
 * 	in-game id
 * 	name
 * 	tags
 * 	image
 * 	description
 * 	[optional] unlock
 */

/**
 * Additional hidden equipments:
	[5, 5, 'AffixRed', 'Ifrit\'s Distinction', 'offense,fire,drop', 'fireAspect', 'Become an aspect of fire.', 'Drop from Fire Elite enemies.'],
	[6, 5, 'AffixBlue', 'Silent Between Two Strikes', 'offense,lightning,drop', 'lightningAspect', 'Become an aspect of lightning.', 'Drop from Lightning Elite enemies.'],
	[9, 5, 'AffixWhite', 'Her Biting Embrace', 'offense,ice,drop', 'iceAspect', 'Become an aspect of ice.', 'Drop from Ice Elite enemies.'],
	[10, 5, 'AffixPoison', 'N\'kuhana\'s Retort', 'offense,malachite,debuff,heal', 'affixMalachite', 'Become an aspect of corruption.', 'Drop from Malachite Elite enemies.'],
	[32, 5, 'AffixHaunted', 'Affix Haunted', 'utility,defense,haunted,elite,drop', 'whiteSquare', 'Become an haunted aspect.\n{misc:(No in-game image yet)}', 'Drop from Haunter Elite enemies.'],
	[29, 5, 'QuestVolatileBattery', 'Fuel Array', 'quest', 'fuelArray', 'Looks like it could power something.\n{offense:EXTREMELY unstable...}.\n{misc:(Not obtainable in-game, used for quest)}'],
 */

export default createStore({
	state: {
		list: [],
		lunarEquipments: [3, 23, 26],
	},
	mutations: {
		addItem(state, item: Item) {
			state.list.push(item);
		},
	},
	actions: {
		load({ commit }) {
			for (const item of list) {
				commit('addItem', {
					id: item[0],
					rarity: item[1],
					uid: item[2],
					name: item[3],
					tags: item[4],
					image: item[5],
					description: item[6],
					unlock: item[7],
				});
			}
		},
	},
});
