<template>
	<dialog
		ref="dialog"
		class="dialog"
		:class="item ? `r-${item.stringRarity}` : ''"
		aria-labelledby="unlock-title"
		@click="onBackdropClick"
		@close="onClose"
		@keydown.esc="hide"
	>
		<template v-if="item">
			<div class="dialog-head">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<rect x="4" y="11" width="16" height="10" rx="2" />
					<path d="M8 11V7a4 4 0 0 1 8 0" />
				</svg>
				<h2>
					<small>How to unlock</small>
					<span id="unlock-title">{{ item.name }}</span>
				</h2>
				<button ref="closeButton" class="dialog-x" type="button" aria-label="Close" @click="hide">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
						<path d="M6 6l12 12M18 6 6 18" />
					</svg>
				</button>
			</div>
			<div class="dialog-body">
				<img v-if="item.image" :src="`img/${item.image}.jpg`" alt="" width="90" height="90" />
				<p>{{ item.unlock }}</p>
			</div>
			<div class="dialog-foot">
				<span class="kbd">Press <span>Esc</span> to close</span>
				<button class="btn" type="button" @click="hide">Close</button>
			</div>
		</template>
	</dialog>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue';

const item = ref<ItemDescription | null>(null);
const dialog = ref<HTMLDialogElement | null>(null);
const closeButton = ref<HTMLButtonElement | null>(null);
let opener: HTMLElement | null = null;

const show = async (selected: ItemDescription, from?: HTMLElement) => {
	item.value = selected;
	opener = from ?? (document.activeElement as HTMLElement | null);
	await nextTick();
	const el = dialog.value;
	if (!el) return;
	// Native modal dialog: traps focus, handles Esc and renders the ::backdrop.
	document.documentElement.classList.add('modal-open');
	if (typeof el.showModal === 'function') {
		if (!el.open) el.showModal();
	} else {
		el.setAttribute('open', '');
	}
	closeButton.value?.focus();
};

const hide = () => {
	const el = dialog.value;
	if (!el) return;
	if (typeof el.close === 'function') {
		el.close();
	} else {
		el.removeAttribute('open');
		onClose();
	}
};

// Clicks on the dialog element itself (not its content) land on the backdrop.
const onBackdropClick = (event: MouseEvent) => {
	if (event.target === dialog.value) hide();
};

// Every close path (Esc, backdrop, buttons) returns focus to the Unlock button.
const onClose = () => {
	document.documentElement.classList.remove('modal-open');
	opener?.focus({ preventScroll: true });
	opener = null;
};

defineExpose({
	show,
	hide,
});
</script>
