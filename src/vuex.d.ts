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
		stringRarity: string;
		uid: string;
		name: string;
		tags: string;
		image: string;
		description: string;
		unlock?: string;
	}

	export interface ModalState {
		visible: boolean;
		item: Item;
	}

	interface State {
		list: Item[];
		lunarEquipments: number[];
		filter: string;
		modal: ModalState;
	}

	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
