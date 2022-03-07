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
	<div class="alert w-full mb-1 overflow-hidden bg-yellow-50 text-yellow-600 rounded-md shadow-md" v-else>
		<div class="p-4 flex flex-row flex-nowrap items-center border-l-4 border-yellow-600 tracking-normal">
			<XCircleIcon class="w-9 h-9 mr-2 text-yellow-600" />
			<div>
				<p>
					Outdated with version <b>{{ newVersion }}</b
					>, I'm currently updating the items. Up to date with version: <b>{{ version }}</b> ({{ date }}).
				</p>
				<p>
					<a
						:href="newUpdateLink"
						rel="noreferrer noopener"
						target="_blank"
						class="flex items-center text-blue-600"
					>
						<SteamIcon /> New patch <ExternalLinkIcon class="w-4 h-4 ml-1 text-blue-600" />
					</a>
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { CheckCircleIcon, ExternalLinkIcon, XCircleIcon } from '@heroicons/vue/outline';
import SteamIcon from './SteamIcon.vue';

export default {
	components: { CheckCircleIcon, ExternalLinkIcon, XCircleIcon, SteamIcon },
	data() {
		return {
			version: '1.1.1.2',
			date: 'April 12, 2021',
			updateLink: 'https://store.steampowered.com/news/app/632360/view/3100140557216075596',
			newVersion: '1.2.1.0',
			newUpdateLink: 'https://store.steampowered.com/news/app/632360/view/3114806614742495252',
		} as {
			version: string;
			date: string;
			updateLink: string;
			newVersion: string;
			newUpdateLink: string;
		};
	},
	computed: {
		upToDate(): boolean {
			return this.version == this.newVersion;
		},
	},
};
</script>

<style scoped></style>
