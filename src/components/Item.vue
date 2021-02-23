<template>
	<div
		class="flex flex-col flex-nowrap overflow-hidden w-32 mb-4 rounded-md border shadow-md"
		:class="[border, background]"
	>
		<div class="flex items-center justify-between p-2 text-xl border-b" :class="[border]">
			{{ item.name }} <span v-if="item.id">#{{ item.id }}</span>
		</div>
		<div class="item-body flex flex-row flex-nowrap">
			<div class="flex-grow-0 flex-shrink-0 border-r" :class="[border]">
				<img :src="`img/${item.image}.png`" title="Click to copy give command" width="90" height="90" />
			</div>
			<div class="flex-grow p-1 overflow-y-auto">
				{{ item.description }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	props: {
		item: { type: Object, required: true },
	},
	methods: {
		beautify(node: HTMLElement, text: string) {
			// Normalize linebreak
			text = text.replace(/(\r?\n|\r)/gm, '\n');
			// Find tokens
			let specialNodes = [];
			let specialCount = 0;
			let lastTokenPos = 0;
			// Find strings that match tag
			let foundOpenPos, foundClosePos;
			while ((foundOpenPos = text.indexOf('{', lastTokenPos)) > -1) {
				foundOpenPos += 1; // Add the tag length to the found position
				// Find the closing tag
				if ((foundClosePos = text.indexOf('}', foundOpenPos)) > -1 && foundOpenPos != foundClosePos) {
					let foundResult = text.substring(foundOpenPos, foundClosePos);
					// Find the category
					let category = undefined;
					let foundCategoryPos = undefined;
					if ((foundCategoryPos = foundResult.indexOf(':')) > -1) {
						category = foundResult.substring(0, foundCategoryPos);
						foundResult = foundResult.substring(foundCategoryPos + 1);
					}
					// Add the found tag to the list
					specialNodes.push({
						text: foundResult,
						category: category,
					});
					// Replace the string by a token \id\
					// Remove the tagLength from foundOpenPos to capture the tag
					// Add the tagLength to foundClosePos to also capture the tag
					let newText = `${text.substring(0, foundOpenPos - 1)}[[$${specialCount}]]${text.substring(
						foundClosePos + 1
					)}`;
					text = newText;
					specialCount++;
				}
				// Update lastTokenPos to reduce the string length to search
				lastTokenPos = foundOpenPos;
			}
			if (specialNodes.length > 0) {
				let parts = text.split(/\[\[\$(\d+)\]\]/);
				let lastPart = parts.length;
				for (let i = 0; i < lastPart; i++) {
					// even index is simple text
					if (i % 2 == 0) {
						node.appendChild(document.createTextNode(parts[i]));
					} else {
						let specialInfo = specialNodes[parseInt(parts[i])];
						let specialNode = document.createElement('span');
						if (specialInfo.category == undefined) {
							specialNode.className = 'is-stackable';
							specialNode.textContent = `(${specialInfo.text} per stack)`;
						} else {
							specialNode.className = `is-${specialInfo.category}`;
							specialNode.textContent = specialInfo.text;
						}
						node.appendChild(specialNode);
					}
				}
			} else node.textContent = text;
		},
	},
	computed: {
		rarity(): string {
			switch (this.item.rarity) {
				case 0:
					return 'common';
				case 1:
					return 'uncommon';
				case 2:
					return 'rare';
				case 3:
					return 'unique';
				case 4:
					return 'lunar';
			}
			//case 5:
			return 'equipment';
		},
		border() {
			return `border-${this.rarity}`;
		},
		background() {
			return `bg-${this.rarity}`;
		},
	},
};
</script>

<style scoped>
.item-body {
	height: 90px;
}
</style>
