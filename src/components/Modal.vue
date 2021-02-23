<template>
	<!-- https://www.tailwindtoolbox.com/components/modal -->
	<div
		ref="modal"
		class="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center cursor-pointer"
		tabindex="0"
		@keydown.esc="hide"
	>
		<div class="modal-overlay absolute w-full h-full bg-gray-800 opacity-90" @click="hide"></div>

		<div class="modal-container w-11/12 md:max-w-md mx-auto shadow-lg z-50 overflow-y-auto">
			<div
				class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
				@click="hide"
			>
				<unicon name="times" width="18" height="18" fill="white"></unicon>
				<span class="text-sm">(Esc)</span>
			</div>
			<div class="modal-content text-left border border-white rounded-md overflow-hidden cursor-default">
				<div class="flex justify-start items-center p-2 text-xl border-b border-white bg-gray-700">
					<unicon name="unlock" class="mr-1" width="24" height="24" fill="white"></unicon>
					How to Unlock
				</div>
				<div class="item-body flex flex-row flex-nowrap bg-gray-800">
					<div class="flex-grow-0 flex-shrink-0 border-r border-white">
						<img v-if="item.image" :src="`img/${item.image}.png`" width="90" height="90" />
					</div>
					<div class="flex-grow p-1 overflow-y-auto">{{ item.unlock }}</div>
				</div>
				<div class="flex justify-end p-2 border-t border-white bg-gray-700">
					<button
						class="modal-close py-1 p-2 rounded-md border border-blue-800 bg-blue-600 transition hover:border-blue-900 hover:bg-blue-700 focus:border-blue-800 focus:ring focus:ring-blue-800"
						@click="hide"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	data() {
		return {
			visible: false,
			item: {},
		} as {
			visible: boolean;
			item: ItemDescription;
		};
	},
	methods: {
		show(item: ItemDescription) {
			this.item = item;
			this.visible = true;
		},
		hide() {
			this.visible = false;
		},
	},
	watch: {
		visible(to, from) {
			if (to != from) {
				const modal = this.$refs.modal as HTMLElement;
				modal.classList.toggle('opacity-0');
				modal.classList.toggle('pointer-events-none');
				document.body.classList.toggle('modal-active');
				if (to) modal.focus();
			}
		},
	},
};
</script>
