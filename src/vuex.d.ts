import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
	export const enum Rarity {
		COMMON,
		UNCOMMON,
		RARE,
		UNIQUE,
		LUNAR,
		EQUIPMENT,
	}

	export interface Item {
		id: number;
		rarity: Rarity;
		uid: string;
		name: string;
		tags: string;
		image: string;
		description: string;
		unlock?: string;
	}

	interface State {
		list: Item[];
		lunarEquipments: number[];
	}

	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
