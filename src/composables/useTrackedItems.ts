import { ref, watch } from 'vue';

export const TRACKED_STORAGE_KEY = 'ror2.trackedItemIds';

const trackedUids = ref<Set<ItemUid>>(new Set());
let hydrated = false;

const resolveStorage = (): Storage | null => {
	try {
		if (typeof window !== 'undefined' && window.localStorage) {
			return window.localStorage;
		}
		if (typeof globalThis !== 'undefined' && 'localStorage' in globalThis) {
			return (globalThis as unknown as { localStorage: Storage }).localStorage;
		}
	} catch {
		// Access to storage can fail in private modes; ignore and behave as volatile state.
	}
	return null;
};

const hydrate = () => {
	if (hydrated) return;
	const storage = resolveStorage();
	if (!storage) {
		hydrated = true;
		return;
	}

	try {
		const raw = storage.getItem(TRACKED_STORAGE_KEY);
		if (raw) {
			const parsed = JSON.parse(raw) as unknown;
			if (Array.isArray(parsed)) {
				const normalized = parsed.filter((entry): entry is ItemUid => typeof entry === 'string');
				trackedUids.value = new Set(normalized);
			}
		}
	} catch {
		trackedUids.value = new Set();
	}

	hydrated = true;
};

const debounce = <Fn extends (...args: unknown[]) => void>(fn: Fn, wait = 300) => {
	let timer: ReturnType<typeof setTimeout> | undefined;
	return (...args: Parameters<Fn>) => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			fn(...args);
		}, wait);
	};
};

const persistTrackedUids = debounce((uids: ItemUid[]) => {
	const storage = resolveStorage();
	if (!storage) return;

	try {
		storage.setItem(TRACKED_STORAGE_KEY, JSON.stringify(uids));
	} catch {
		// If storage quota is exceeded, fall back to volatile behavior.
	}
});

watch(
	trackedUids,
	(set) => {
		if (!hydrated) return;
		persistTrackedUids(Array.from(set));
	},
	{ deep: false }
);

export const useTrackedItems = () => {
	hydrate();

	const isTracked = (uid: ItemUid): boolean => {
		return trackedUids.value.has(uid);
	};

	const toggleTracked = (uid: ItemUid): void => {
		const next = new Set(trackedUids.value);
		if (next.has(uid)) {
			next.delete(uid);
		} else {
			next.add(uid);
		}
		trackedUids.value = next;
	};

	const clearTracked = (): void => {
		trackedUids.value = new Set<ItemUid>();
	};

	return {
		trackedUids,
		isTracked,
		toggleTracked,
		clearTracked,
	};
};

export type UseTrackedItemsReturn = ReturnType<typeof useTrackedItems>;
