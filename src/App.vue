<template>
	<Starfield />
	<div class="page">
		<header class="top">
			<a
				class="brand"
				title="GitHub repository"
				target="_blank"
				href="https://github.com/Glagan/RoR2-Items"
				rel="noreferrer noopener"
			>
				<span class="eyebrow">Glagan</span>
				<h1 class="title">
					Risk of Rain 2 Items &amp;
					<span class="title-tail"
						>Equipments<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path
								d="M12 2.25a10 10 0 0 0-3.16 19.48c.5.09.69-.21.69-.47l-.01-1.87c-2.53.47-3.18-.62-3.38-1.18a3.6 3.6 0 0 0-1.03-1.41c-.35-.19-.85-.65-.01-.66a2 2 0 0 1 1.54 1.02 2.14 2.14 0 0 0 2.91.83 2.1 2.1 0 0 1 .64-1.34c-2.23-.25-4.55-1.11-4.55-4.94a3.9 3.9 0 0 1 1.03-2.69 3.6 3.6 0 0 1 .1-2.65s.84-.26 2.75 1.03a9.4 9.4 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03a3.6 3.6 0 0 1 .1 2.65 3.87 3.87 0 0 1 1.03 2.69c0 3.84-2.34 4.69-4.57 4.94a2.37 2.37 0 0 1 .68 1.85l-.01 2.75c0 .26.19.58.69.48A10 10 0 0 0 12 2.25Z"
							/></svg
					></span>
				</h1>
			</a>
			<div class="top-actions">
				<UpdateAlert />
				<a
					class="kofi"
					href="https://ko-fi.com/Y8Y32X73U"
					target="_blank"
					rel="noreferrer noopener"
					aria-label="Support on Ko-fi"
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z" />
						<path d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17" />
						<path
							d="M10.5 15.5s-2.5-1.4-2.5-3a1.3 1.3 0 0 1 2.5-.5 1.3 1.3 0 0 1 2.5.5c0 1.6-2.5 3-2.5 3Z"
							fill="currentColor"
							stroke="none"
						/>
					</svg>
					<span>Support on Ko-fi</span>
				</a>
			</div>
		</header>
		<form ref="toolbarEl" class="toolbar" @submit.prevent="">
			<div ref="searchRowEl" class="search-row">
				<label class="search">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<circle cx="11" cy="11" r="7" />
						<path d="m20 20-3.5-3.5" />
					</svg>
					<input
						v-model="strFilter"
						type="search"
						autocomplete="off"
						aria-label="Search items"
						:placeholder="placeholder"
						@keydown.enter.prevent=""
					/>
					<button type="button" class="clear" @click.prevent="clearFilter">
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.2"
							aria-hidden="true"
						>
							<path d="M6 6l12 12M18 6 6 18" />
						</svg>
						Clear
					</button>
				</label>
				<div class="result-count">
					<b>{{ items.length }}</b> of {{ list.length }} items
				</div>
			</div>
			<div class="filters" role="group" aria-label="Filter items">
				<FilterButton
					:rarity="TRACKED"
					name="Tracked"
					:selected="selectedRarity"
					v-on:selectRarity="selectRarity"
					:badge-count="trackedCount"
					:hide-badge-zero="true"
				/>
				<span class="filters-divider" aria-hidden="true"></span>
				<FilterButton rarity="all" name="All" :selected="selectedRarity" v-on:selectRarity="selectRarity" />
				<FilterButton
					v-for="(item, index) in rarities"
					:rarity="index"
					:name="item"
					:key="item"
					:selected="selectedRarity"
					v-on:selectRarity="selectRarity"
				/>
			</div>
		</form>
		<main class="items">
			<template v-if="items.length > 0">
				<Item
					v-for="item in items"
					:key="item.uid"
					:item="item"
					:tracked="isTracked(item.uid)"
					@showModal="showModal"
					@toggleTracked="toggleTracked"
					@announce="announce"
				/>
			</template>
			<div v-else class="empty">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
					<circle cx="11" cy="11" r="7" />
					<path d="m20 20-3.5-3.5" />
				</svg>
				{{ emptyStateMessage }}
			</div>
		</main>
		<div class="sr-only-live" aria-live="polite">{{ announcement }}</div>
	</div>
	<Modal ref="modal" />
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import Item from './components/Item.vue';
import Modal from './components/Modal.vue';
import allItems from './assets/list.json';
import Rarity from './Rarity';
import FilterButton from './components/FilterButton.vue';
import UpdateAlert from './components/UpdateAlert.vue';
import Starfield from './components/Starfield.vue';
import { useTrackedItems } from './composables/useTrackedItems';

/**
 * Additional hidden equipments:
 *	[5, 5, 'AffixRed', 'Ifrit\'s Distinction', 'offense,fire,drop', 'fireAspect', 'Become an aspect of fire.', 'Drop from Fire Elite enemies.'],
 *	[6, 5, 'AffixBlue', 'Silent Between Two Strikes', 'offense,lightning,drop', 'lightningAspect', 'Become an aspect of lightning.', 'Drop from Lightning Elite enemies.'],
 *	[9, 5, 'AffixWhite', 'Her Biting Embrace', 'offense,ice,drop', 'iceAspect', 'Become an aspect of ice.', 'Drop from Ice Elite enemies.'],
 *	[10, 5, 'AffixPoison', 'N\'kuhana\'s Retort', 'offense,malachite,debuff,heal', 'affixMalachite', 'Become an aspect of corruption.', 'Drop from Malachite Elite enemies.'],
 *	[32, 5, 'AffixHaunted', 'Affix Haunted', 'utility,defense,haunted,elite,drop', 'whiteSquare', 'Become an haunted aspect.\n{misc:(No in-game image yet)}', 'Drop from Haunter Elite enemies.'],
 *	[29, 5, 'QuestVolatileBattery', 'Fuel Array', 'quest', 'fuelArray', 'Looks like it could power something.\n{offense:EXTREMELY unstable...}.\n{misc:(Not obtainable in-game, used for quest)}'],
 */

const list = ref<ItemDescription[]>([]);
const strFilter = ref('');
const rarityFilter = ref<'all' | Rarity>('all');
const rarities = [
	'Common',
	'Uncommon',
	'Rare',
	'Unique',
	'Corrupted',
	'Meal',
	'Lunar',
	'Equipment',
	'Hallowed',
	'Hex',
	'Page',
	'Curio',
];
const TRACKED = Rarity.TRACKED;
const modal = ref<typeof Modal | null>(null);
const { trackedUids, isTracked, toggleTracked } = useTrackedItems();
const trackedCount = computed(() => trackedUids.value.size);

const items = computed((): ItemDescription[] => {
	return list.value.filter((item: ItemDescription) => {
		const matchesSearch =
			strFilter.value == '' ||
			item.name.indexOf(strFilter.value) >= 0 ||
			item.tags.indexOf(strFilter.value) >= 0 ||
			item.uid.indexOf(strFilter.value) >= 0 ||
			item.description.indexOf(strFilter.value) >= 0 ||
			item.image.indexOf(strFilter.value) >= 0 ||
			item.stringRarity.indexOf(strFilter.value) >= 0;

		if (!matchesSearch) {
			return false;
		}

		if (rarityFilter.value === 'all') {
			return true;
		}

		if (rarityFilter.value === Rarity.TRACKED) {
			return trackedUids.value.has(item.uid);
		}

		return rarityFilter.value === item.rarity;
	});
});

const emptyStateMessage = computed(() => {
	if (rarityFilter.value === Rarity.TRACKED) {
		return trackedCount.value === 0
			? 'No tracked items yet. Click the star icon on any card to add it here.'
			: 'No tracked items match your search. Adjust your keywords or untrack items to change the list.';
	}

	return 'No Items found.';
});

const rarityToString = (rarity: Rarity): string => {
	switch (rarity) {
		case Rarity.COMMON:
			return 'common';
		case Rarity.UNCOMMON:
			return 'uncommon';
		case Rarity.RARE:
			return 'rare';
		case Rarity.UNIQUE:
			return 'unique';
		case Rarity.CORRUPTED:
			return 'corrupted';
		case Rarity.MEAL:
			return 'meal';
		case Rarity.LUNAR:
			return 'lunar';
		case Rarity.HALLOWED:
			return 'hallowed';
		case Rarity.HEX:
			return 'hex';
		case Rarity.PAGE:
			return 'page';
		case Rarity.CURIO:
			return 'curio';
		case Rarity.TRACKED:
			return 'tracked';
	}
	//case Rarity.EQUIPMENT:
	return 'equipment';
};

const selectedRarity = computed((): 'all' | Rarity => {
	return rarityFilter.value;
});

const clearFilter = () => {
	strFilter.value = '';
};

const selectRarity = (type: 'all' | Rarity) => {
	rarityFilter.value = type;
};

// Long placeholder on wide screens, short one where it would be cut beside Clear.
const narrowQuery = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(max-width: 640px)') : null;
const isNarrow = ref(narrowQuery?.matches ?? false);
const onNarrowChange = (event: MediaQueryListEvent) => (isNarrow.value = event.matches);
narrowQuery?.addEventListener?.('change', onNarrowChange);
onBeforeUnmount(() => narrowQuery?.removeEventListener?.('change', onNarrowChange));
const placeholder = computed(() => (isNarrow.value ? 'Search items' : 'Search name, tags, rarity and description'));

// Publish the pinned bar's height so scroll-padding keeps focused cards visible below it.
const toolbarEl = ref<HTMLElement | null>(null);
const searchRowEl = ref<HTMLElement | null>(null);
const updateStickyOffset = () => {
	const toolbar = toolbarEl.value;
	const searchRow = searchRowEl.value;
	if (!toolbar || !searchRow) return;
	// Narrow/short layouts pin only the search row (the toolbar becomes display: contents).
	const pinned = getComputedStyle(toolbar).display === 'contents' ? searchRow : toolbar;
	document.documentElement.style.setProperty('--sticky-offset', `${pinned.offsetHeight + 8}px`);
};
let stickyObserver: ResizeObserver | undefined;
onMounted(() => {
	updateStickyOffset();
	window.addEventListener('resize', updateStickyOffset);
	if (typeof ResizeObserver !== 'undefined') {
		stickyObserver = new ResizeObserver(updateStickyOffset);
		if (toolbarEl.value) stickyObserver.observe(toolbarEl.value);
		if (searchRowEl.value) stickyObserver.observe(searchRowEl.value);
	}
});
onBeforeUnmount(() => {
	window.removeEventListener('resize', updateStickyOffset);
	stickyObserver?.disconnect();
});

const announcement = ref('');
const announce = (message: string) => {
	announcement.value = message;
};

const showModal = (item: ItemDescription, opener?: HTMLElement) => {
	if (modal.value) {
		modal.value.show(item, opener);
	}
};

onMounted(() => {
	for (const rawItem of allItems) {
		if (rawItem.length === 1) continue;
		const item = rawItem as RawItemDescription;
		list.value.push({
			id: item[0],
			rarity: item[1],
			stringRarity: rarityToString(item[1]),
			uid: item[2],
			name: item[3],
			tags: item[4],
			image: item[5],
			description: item[6],
			unlock: item[7],
		});
	}
});
</script>
