import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';

const STORAGE_KEY = 'ror2.trackedItemIds';

const loadComposable = async () => {
	const module = await import('../useTrackedItems');
	expect(module.TRACKED_STORAGE_KEY).toBe(STORAGE_KEY);
	return module;
};

describe('useTrackedItems', () => {
	beforeEach(() => {
		localStorage.clear();
		vi.resetModules();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});

	it('hydrates tracked ids from storage', async () => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(['item-a', 'item-b']));

		const { useTrackedItems } = await loadComposable();
		const { isTracked, trackedUids } = useTrackedItems();

		expect(isTracked('item-a')).toBe(true);
		expect(isTracked('item-b')).toBe(true);
		expect(trackedUids.value.size).toBe(2);
	});

	it('toggles ids in the tracked set', async () => {
		const { useTrackedItems } = await loadComposable();
		const { toggleTracked, isTracked, trackedUids } = useTrackedItems();

		expect(trackedUids.value.size).toBe(0);

		toggleTracked('item-42');
		expect(isTracked('item-42')).toBe(true);

		toggleTracked('item-42');
		expect(isTracked('item-42')).toBe(false);
	});

	it('debounces persistence to localStorage', async () => {
		const { useTrackedItems } = await loadComposable();
		const { toggleTracked } = useTrackedItems();

		toggleTracked('item-7');
		await nextTick();
		expect(localStorage.getItem(STORAGE_KEY)).toBeNull();

		vi.advanceTimersByTime(400);

		expect(localStorage.getItem(STORAGE_KEY)).toEqual(JSON.stringify(['item-7']));
	});

	it('clears tracked ids and updates storage', async () => {
		const { useTrackedItems } = await loadComposable();
		const { toggleTracked, clearTracked, trackedUids } = useTrackedItems();

		toggleTracked('item-7');
		toggleTracked('item-9');
		await nextTick();
		vi.advanceTimersByTime(400);
		expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')).toEqual(['item-7', 'item-9']);

		clearTracked();
		await nextTick();
		expect(trackedUids.value.size).toBe(0);

		vi.advanceTimersByTime(400);
		expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')).toEqual([]);
	});
});
