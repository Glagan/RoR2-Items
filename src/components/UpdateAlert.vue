<template>
	<div class="alert w-full mb-1 overflow-hidden bg-green-50 text-green-600 rounded-md shadow-md" v-if="upToDate">
		<div class="p-4 flex flex-row flex-nowrap items-center border-l-4 border-green-600 tracking-normal">
			<unicon class="mr-2" name="check-circle" width="36" height="36" fill="#059669"></unicon>
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
						<unicon
							name="steam"
							class="mr-1"
							width="16"
							height="16"
							viewBox="0 0 233 233"
							fill="inherit"
						></unicon>
						Last patch
						<unicon name="external-link-alt" class="ml-1" width="16" height="16" fill="#2563EB"></unicon>
					</a>
				</p>
			</div>
		</div>
	</div>
	<div class="alert w-full mb-1 overflow-hidden bg-yellow-50 text-yellow-600 rounded-md shadow-md" v-else>
		<div class="p-4 flex flex-row flex-nowrap items-center border-l-4 border-yellow-600 tracking-normal">
			<unicon class="mr-2" name="times-circle" width="36" height="36" fill="#d97706"></unicon>
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
						<unicon
							name="steam"
							class="mr-1"
							width="16"
							height="16"
							viewBox="0 0 233 233"
							fill="inherit"
						></unicon>
						New patch
						<unicon name="external-link-alt" class="ml-1" width="16" height="16" fill="#2563EB"></unicon>
					</a>
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	data() {
		return {
			version: '1.1.0.1',
			date: 'March 25, 2021',
			updateLink: 'https://store.steampowered.com/news/app/632360/view/3008941395560828301',
			newVersion: '1.1.0.1',
			newUpdateLink: 'https://store.steampowered.com/news/app/632360/view/3008941395560828301',
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
