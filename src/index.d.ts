interface ItemDescription {
	id: number;
	rarity: import('./Rarity').Rarity;
	stringRarity: string;
	uid: string;
	name: string;
	tags: string;
	image: string;
	description: string;
	unlock?: string;
}

type ItemUid = ItemDescription['uid'];

type RawItemDescription = [
	id: number,
	rarity: import('./Rarity').Rarity,
	uid: string,
	name: string,
	tags: string,
	image: string,
	description: string,
	unlock?: string
];
