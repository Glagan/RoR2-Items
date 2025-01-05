<template>
	<div class="alert w-full mb-1 overflow-hidden bg-green-50 text-green-600 rounded-md shadow-md" v-if="upToDate">
		<div class="p-4 flex flex-row flex-nowrap items-center border-l-4 border-green-600 tracking-normal">
			<CheckCircleIcon class="w-9 h-9 mr-2 text-green-600" />
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
			<component
				:is="updating ? RefreshIcon : XCircleIcon"
				class="w-9 h-9 mr-2"
				:class="updating ? 'text-blue-600' : 'text-yellow-600'"
			/>
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
						<ExternalLinkIcon class="w-4 h-4 ml-1 text-blue-600" />
					</a>
				</p>
				<p class="mt-4" v-if="updating">{{ updating }}</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { CheckCircleIcon, ExternalLinkIcon, XCircleIcon, RefreshIcon } from '@heroicons/vue/outline';
import SteamIcon from './SteamIcon.vue';

const version = ref('1.3.1#274 (Seeker of the Storm DLC)');
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
