<template>
	<div class="alert w-full mb-1 overflow-hidden bg-green-50 text-green-600 rounded-md shadow-md" v-if="upToDate">
		<div class="p-4 flex flex-row flex-nowrap items-center border-l-4 border-green-600 tracking-normal">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-9 h-9 mr-2 text-green-600"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
				/>
			</svg>
			<div>
				<p>
					Up to date with version <b class="inline-block mx-1">{{ version }}</b> ({{ date }}).
				</p>
				<p>
					<a
						:href="updateLink"
						rel="noreferrer noopener"
						target="_blank"
						class="flex items-center text-blue-600"
					>
						<SteamIcon /> Last patch <ExternalLinkIcon class="w-4 h-4 ml-1 text-blue-600" />
					</a>
				</p>
			</div>
		</div>
	</div>
	<div
		class="alert w-full mb-1 overflow-hidden rounded-md shadow-md"
		:class="updating ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'"
		v-else
	>
		<div
			class="p-4 flex flex-row flex-nowrap items-center border-l-4 tracking-normal"
			:class="updating ? 'border-blue-600' : 'border-yellow-600'"
		>
			<svg
				v-if="updating"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-9 h-9 mr-2 text-blue-600"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
				/>
			</svg>
			<svg
				v-else
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-9 h-9 mr-2 text-yellow-600"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
				/>
			</svg>
			<div>
				<p>
					Currently up to date with version <b>{{ version }}</b
					>.<br />
					Update in progress for version <b>{{ newVersion }}</b> ({{ date }}).
				</p>
				<p>
					<a
						:href="newUpdateLink"
						rel="noreferrer noopener"
						target="_blank"
						class="flex flex-row items-center text-blue-600 font-bold"
					>
						<SteamIcon />
						<span>New patch</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-4 h-4 ml-1 text-blue-600"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
							/>
						</svg>
					</a>
				</p>
				<p class="mt-4" v-if="updating">{{ updating }}</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import SteamIcon from './SteamIcon.vue';

const version = ref('1.3.6#371 (Seeker of the Storm DLC)');
const date = ref('December 10, 2024');
const updateLink = ref('https://store.steampowered.com/news/app/632360/view/4281321170606899293');
const newVersion = ref('1.3.6#371 (Seeker of the Storm DLC)');
const newUpdateLink = ref('https://store.steampowered.com/news/app/632360/view/510692079688483816');
const updating = ref<string | false>('Currently updating for the latest DLC update.');

const upToDate = computed(() => {
	return version.value == newVersion.value;
});
</script>

<style scoped></style>
