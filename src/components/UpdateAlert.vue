<template>
	<div v-if="upToDate" class="status">
		<span class="lead">
			<span class="dot" aria-hidden="true"></span>
			<span
				>Up to date · <b>{{ versionNumber }}</b> {{ versionName }}</span
			>
		</span>
		<span class="sep" aria-hidden="true"></span>
		<span>{{ shortDate }}</span>
		<span class="sep" aria-hidden="true"></span>
		<a :href="updateLink" rel="noreferrer noopener" target="_blank">
			<SteamIcon />Patch notes
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
				<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
			</svg>
		</a>
	</div>
	<div v-else class="status is-updating">
		<div class="status-line">
			<span class="lead">
				<span class="dot" aria-hidden="true"></span>
				<span
					>{{ updating ? 'Updating to' : 'Not yet updated for' }} <b>{{ newVersion }}</b></span
				>
			</span>
			<span class="sep" aria-hidden="true"></span>
			<span>Data from {{ versionNumber }} · {{ shortDate }}</span>
			<span class="sep" aria-hidden="true"></span>
			<a :href="newUpdateLink" rel="noreferrer noopener" target="_blank">
				<SteamIcon />New patch
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
				</svg>
			</a>
		</div>
		<span v-if="updating" class="status-note">{{ updating }}</span>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import SteamIcon from './SteamIcon.vue';

const version = ref('1.5.0 (Hallowed Concepts DLC)');
const date = ref('October 14, 2026');
const updateLink = ref('https://steamcommunity.com/games/632360/announcements/detail/669505296465396193');
const newVersion = ref(version.value);
const newUpdateLink = ref(updateLink.value);
const updating = ref<string | false>('Currently updating for the latest DLC update.');

// "1.5.0 (Hallowed Concepts DLC)" -> number "1.5.0" and name "Hallowed Concepts".
const versionNumber = computed(() => version.value.split(' ')[0]);
const versionName = computed(() => /\((.+?)(?: DLC)?\)/.exec(version.value)?.[1] ?? '');

// "October 14, 2026" -> "Oct 14, 2026" so the status pill stays compact.
const shortDate = computed(() => {
	const parsed = new Date(date.value);
	return Number.isNaN(parsed.getTime())
		? date.value
		: parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
});

const upToDate = computed(() => {
	return version.value == newVersion.value;
});
</script>
