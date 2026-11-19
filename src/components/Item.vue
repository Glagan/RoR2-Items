<template>
	<article class="card" :class="`r-${item.stringRarity}`">
		<div class="card-head">
			<h3 class="card-name" :title="item.name">{{ item.name }}</h3>
			<div class="card-actions">
				<button v-if="item.unlock" type="button" class="unlock" @click.prevent="toggleModal">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
						<rect x="4" y="11" width="16" height="10" rx="2" />
						<path d="M8 11V7a4 4 0 0 1 8 0" />
					</svg>
					Unlock
				</button>
				<span v-if="item.id >= 0" class="card-id">#{{ item.id }}</span>
				<button
					type="button"
					class="star"
					:aria-pressed="tracked"
					:aria-label="trackingLabel"
					:title="trackingTitle"
					@click.stop="handleToggleTracked"
				>
					<svg
						viewBox="0 0 24 24"
						:fill="tracked ? 'currentColor' : 'none'"
						stroke="currentColor"
						stroke-width="1.6"
						aria-hidden="true"
					>
						<path
							stroke-linejoin="round"
							d="M11.48 3.5a.56.56 0 0 1 1.04 0l2.13 5.11a.56.56 0 0 0 .47.35l5.52.44c.5.04.7.66.32.99l-4.2 3.54a.56.56 0 0 0-.18.56l1.28 5.38a.56.56 0 0 1-.84.61l-4.72-2.88a.56.56 0 0 0-.59 0l-4.72 2.88a.56.56 0 0 1-.84-.61l1.28-5.38a.56.56 0 0 0-.18-.56l-4.2-3.54a.56.56 0 0 1 .32-.99l5.52-.44a.56.56 0 0 0 .47-.35l2.13-5.11Z"
						/>
					</svg>
				</button>
			</div>
		</div>
		<div class="item-body" :class="{ 'is-open': descOpen }">
			<button
				v-if="giveCommand"
				v-lazyload
				type="button"
				class="icon"
				:class="copyState"
				:title="`Copy give command: ${giveCommand}`"
				:aria-label="`Copy give command for ${item.name}`"
				@click="copyGive"
			>
				<img alt="" width="90" height="90" :data-url="`img/${item.image}.jpg`" />
				<span class="copy" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
						<rect x="9" y="9" width="11" height="11" rx="2" />
						<path d="M5 15V5a1 1 0 0 1 1-1h10" />
					</svg>
					{{ copyLabel }}
				</span>
			</button>
			<div v-else v-lazyload class="icon plain">
				<img alt="" width="90" height="90" :data-url="`img/${item.image}.jpg`" />
			</div>
			<div
				class="desc-wrap"
				:class="{ 'has-more': hasMore && !descOpen, 'is-open': descOpen, 'has-toggle': scrollable || descOpen }"
			>
				<div :id="descId" ref="descEl" class="desc" @scroll.passive="updateHasMore" v-html="description"></div>
				<button
					v-if="scrollable || descOpen"
					type="button"
					class="desc-toggle"
					:aria-controls="descId"
					:aria-expanded="descOpen"
					:aria-label="descOpen ? `Collapse ${item.name} description` : `Show full ${item.name} description`"
					:title="descOpen ? 'Collapse description' : 'Show full description'"
					@click="toggleDesc"
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
						<path d="m6 9 6 6 6-6" />
					</svg>
				</button>
			</div>
		</div>
	</article>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import Rarity from '../Rarity';

const props = withDefaults(defineProps<{ item: ItemDescription; tracked?: boolean }>(), {
	tracked: false,
});

const emit = defineEmits<{
	(event: 'showModal', item: ItemDescription, opener?: HTMLElement): void;
	(event: 'toggleTracked', uid: ItemUid): void;
	(event: 'announce', message: string): void;
}>();

const description = computed(() => {
	return props.item.description
		.replaceAll(/{(offense|defense|debuff|misc|corrupt):(.+?)}/g, `<span class="is-$1">$2</span>`)
		.replaceAll(/{(.+?)\$}/g, `<span class="is-stackable not-per-stack">$1</span>`)
		.replaceAll(/{(.+?)\|(.+?)}/g, `<span class="is-stackable">($1 $2)</span>`)
		.replaceAll(/{(.+?)}/g, `<span class="is-stackable">($1 per stack)</span>`);
});

const trackingTitle = computed(() => (props.tracked ? 'Untrack item' : 'Track item'));
const trackingLabel = computed(() => `${props.tracked ? 'Untrack' : 'Track'} ${props.item.name}`);
const giveCommand = computed(() => {
	const { id, uid, rarity } = props.item;
	if (rarity === Rarity.CURIO || (id < 0 && uid.startsWith('missinguid_'))) return;

	// Catalog indices are build-specific; new entries use the game's asset name instead.
	const target = id < 0 ? uid : id;
	// Lunar items and equipment share a filter, not a catalog.
	const isLunarEquipment = rarity === Rarity.LUNAR && ['BurnNearby', 'CrippleWard', 'Meteor', 'Tonic'].includes(uid);
	return rarity === Rarity.EQUIPMENT || isLunarEquipment ? `give_equip ${target}` : `give_item ${target} 1`;
});

const copyState = ref<'' | 'copied' | 'failed'>('');
const copyLabel = computed(() =>
	copyState.value === 'copied' ? 'Copied' : copyState.value === 'failed' ? "Couldn't copy" : 'Copy',
);
let copyTimer: ReturnType<typeof setTimeout> | undefined;
const settleCopy = (ok: boolean) => {
	copyState.value = ok ? 'copied' : 'failed';
	emit('announce', ok ? `Copied ${giveCommand.value}` : "Couldn't copy the give command");
	clearTimeout(copyTimer);
	copyTimer = setTimeout(() => (copyState.value = ''), 1600);
};

const copyGive = () => {
	const command = giveCommand.value;
	if (!command) return;
	try {
		// Only report success once the clipboard write has actually resolved.
		Promise.resolve(navigator.clipboard.writeText(command)).then(
			() => settleCopy(true),
			() => settleCopy(false),
		);
	} catch {
		settleCopy(false);
	}
};

const toggleModal = (event: MouseEvent) => {
	emit('showModal', props.item, event.currentTarget as HTMLElement);
};

// Show a "more below" hint while the description pane has unread overflow.
const descEl = ref<HTMLElement | null>(null);
const hasMore = ref(false);
// Long descriptions get a toggle that expands the pane to its full height.
const scrollable = ref(false);
const descOpen = ref(false);
const descId = computed(() => `desc-${props.item.uid}`);
const toggleDesc = () => {
	descOpen.value = !descOpen.value;
	if (!descOpen.value) nextTick(updateHasMore);
};
const updateHasMore = () => {
	const el = descEl.value;
	scrollable.value = !!el && el.scrollHeight > el.clientHeight + 2;
	hasMore.value = !!el && el.scrollHeight - el.scrollTop - el.clientHeight > 2;
};
let resizeObserver: ResizeObserver | undefined;
onMounted(() => {
	updateHasMore();
	document.fonts?.ready.then(updateHasMore);
	if (typeof ResizeObserver !== 'undefined' && descEl.value) {
		resizeObserver = new ResizeObserver(updateHasMore);
		resizeObserver.observe(descEl.value);
	}
});
watch(description, () => nextTick(updateHasMore));
onBeforeUnmount(() => {
	resizeObserver?.disconnect();
	clearTimeout(copyTimer);
});

const handleToggleTracked = () => {
	emit('toggleTracked', props.item.uid);
};
</script>
