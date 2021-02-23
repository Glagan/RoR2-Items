declare const enum Rarity {
	COMMON,
	UNCOMMON,
	RARE,
	UNIQUE,
	LUNAR,
	EQUIPMENT,
}

interface ItemDescription {
	id: number;
	rarity: Rarity;
	stringRarity: string;
	uid: string;
	name: string;
	tags: string;
	image: string;
	description: string;
	unlock?: string;
}

type RawItemDescription = [
	id: number,
	rarity: Rarity,
	uid: string,
	name: string,
	tags: string,
	image: string,
	description: string,
	unlock?: string
];
