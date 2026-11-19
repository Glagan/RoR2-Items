import { afterEach, describe, expect, it, vi } from 'vitest';
import { createApp, nextTick, type App as VueApp } from 'vue';
import App from '../App.vue';
import Rarity from '../Rarity';
import catalog from '../assets/list.json';
import LazyLoadDirective from '../directives/LazyLoadDirective';

const dlcItems = catalog.filter((entry) => typeof entry[4] === 'string' && entry[4].split(',').includes('dlc4'));
let app: VueApp | undefined;
let root: HTMLDivElement | undefined;

afterEach(() => {
	app?.unmount();
	root?.remove();
	vi.unstubAllGlobals();
});

async function mountCatalog() {
	localStorage.clear();
	root = document.createElement('div');
	document.body.append(root);
	app = createApp(App).directive('lazyload', LazyLoadDirective);
	app.mount(root);
	await nextTick();
	return root;
}

describe('Hallowed Concepts catalog', () => {
	it('imports the DLC entries with unique game identifiers and site-compatible descriptions', () => {
		const counts = dlcItems.reduce<Record<number, number>>((result, entry) => {
			const rarity = entry[1] as Rarity;
			result[rarity] = (result[rarity] ?? 0) + 1;
			return result;
		}, {});
		expect(counts).toEqual({
			[Rarity.UNIQUE]: 3,
			[Rarity.EQUIPMENT]: 1,
			[Rarity.HALLOWED]: 11,
			[Rarity.HEX]: 14,
			[Rarity.PAGE]: 8,
			[Rarity.CURIO]: 1,
		});
		for (const entry of dlcItems) {
			const [, , uid, , , icon, description] = entry;
			expect(uid).toMatch(/^[A-Za-z0-9]+$/);
			expect(catalog.filter((row) => row[2] === uid)).toHaveLength(1);
			expect(icon).toMatch(/^[A-Za-z0-9]+$/);
			expect(description).not.toMatch(/<[^>]*>/);
		}
	});

	it('filters the new cards without displacing the Tracked filter', async () => {
		const page = await mountCatalog();
		const select = async (name: string) => {
			const tab = Array.from(page.querySelectorAll<HTMLButtonElement>('button.filter')).find((button) =>
				button.textContent?.trim().startsWith(name)
			);
			expect(tab).toBeDefined();
			tab!.click();
			await nextTick();
		};

		for (const [tab, image, count] of [
			['Hallowed', 'blightZone', 11],
			['Hex', 'hexCurse', 14],
			['Page', 'pageClarity', 8],
			['Curio', 'cursedBook', 1],
		] as const) {
			await select(tab);
			expect(page.querySelectorAll('.item-body img[data-url]')).toHaveLength(count);
			expect(page.querySelector(`img[data-url="img/${image}.jpg"]`)).not.toBeNull();
		}
		page.querySelector<HTMLButtonElement>('button[aria-label="Track The N\'tormat"]')!.click();
		await select('Tracked');
		expect(page.querySelectorAll('.item-body img[data-url]')).toHaveLength(1);
		expect(page.querySelector('img[data-url="img/cursedBook.jpg"]')).not.toBeNull();
	});

	it('copies item and equipment commands by asset name, but not for the curio', async () => {
		const writeText = vi.fn();
		vi.stubGlobal('navigator', { clipboard: { writeText } });
		const page = await mountCatalog();
		const clickIcon = (name: string) => page.querySelector<HTMLImageElement>(`img[data-url="img/${name}.jpg"]`)!.click();

		clickIcon('blightZone');
		clickIcon('spawnAltar');
		clickIcon('cursedBook');

		expect(writeText.mock.calls).toEqual([['give_item BlightZone 1'], ['give_equip SpawnAltar']]);
	});
});
