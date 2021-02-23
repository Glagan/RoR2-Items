import { Item, ModalState } from 'vue';

export default {
	namespaced: true,
	state: {
		visible: false,
		item: {},
	},
	mutations: {
		show(state: ModalState, item: Item) {
			state.visible = true;
			state.item = item;
		},
		hide(state: ModalState) {
			state.visible = false;
		},
	},
};
