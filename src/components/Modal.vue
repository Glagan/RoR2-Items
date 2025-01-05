<template>
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
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-4 h-4 text-white"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>
				<span class="text-sm">(Esc)</span>
			</div>
			<div class="modal-content text-left border border-white rounded-md overflow-hidden cursor-default">
				<div class="flex justify-start items-center p-2 text-xl border-b border-white bg-gray-700">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6 mr-1 text-white"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
						/>
					</svg>
					How to Unlock
				</div>
				<div class="item-body flex flex-row flex-nowrap bg-gray-800" v-if="item">
					<div class="flex-grow-0 flex-shrink-0 border-r border-white">
						<img v-if="item.image" :src="`img/${item.image}.jpg`" width="90" height="90" />
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

<script lang="ts" setup>
import { ref, watch } from 'vue';

// @see https://www.tailwindtoolbox.com/components/modal
const visible = ref(false);
const item = ref<ItemDescription | null>(null);
const modal = ref<HTMLElement | null>(null);

const show = (selected: ItemDescription) => {
	item.value = selected;
	visible.value = true;
};
const hide = () => {
	visible.value = false;
};

watch(visible, (to, from) => {
	if (to != from && modal.value) {
		modal.value.classList.toggle('opacity-0');
		modal.value.classList.toggle('pointer-events-none');
		document.body.classList.toggle('modal-active');
		if (to) modal.value.focus();
	}
});

defineExpose({
	show,
});
</script>
