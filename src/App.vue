<template>
	<div class="container w-9/12 mx-auto p-2">
		<h1 class="flex flex-row items-center justify-between text-5xl">
			Risk of Rain 2 Items &amp; Equipments
			<a href="https://github.com/Glagan/RoR2-Items" rel="noreferrer noopener">
				<unicon name="github" width="48" height="48" fill="white"></unicon>
			</a>
		</h1>
		<div class="w-full my-4 overflow-hidden bg-green-50 text-green-600 rounded-md shadow-md">
			<div class="p-4 flex items-center border-l-4 border-green-600 tracking-normal">
				<unicon class="mr-2" name="check-circle" width="28" height="28" fill="#059669"></unicon>
				Up to date with version <b>1.0.1.1</b> (September 1st 2020).
			</div>
		</div>
		<form class="flex flex-nowrap">
			<button class="rounded-l-md bg-red-600 text-white border-2 border-red-700 py-1 px-2">Clear</button>
			<input
				class="flex-grow text-black placeholder-gray-500 border border-gray-200 rounded-r-md p-2 focus:border-light-blue-500 focus:ring-2 focus:ring-light-blue-500"
			/>
		</form>
		<div class="flex flex-row">
			<div
				class="flex flex-col flex-nowrap overflow-hidden w-1/3 m-2 rounded-md border border-common bg-common shadow-md"
			>
				<div class="flex items-center justify-between p-2 text-xl border-b border-gray-800">
					Soldier's Syringe <span>#1</span>
				</div>
				<div class="flex flex-row flex-nowrap">
					<div class="flex-grow-0 flex-shrink-0 border-r border-gray-800">
						<img src="img/syringe.png" title="Click to copy give command" width="90" height="90" />
					</div>
					<div class="flex-grow p-1">
						Increase <span class="is-offense">Attack Speed</span> by <span class="is-offense">15%</span>
						<span class="is-stackable"> (+15% per stack)</span>
					</div>
				</div>
			</div>
			<div
				class="flex flex-col flex-nowrap overflow-hidden w-1/3 m-2 rounded-md border border-uncommon bg-uncommon shadow-md"
			>
				<div class="p-2 text-xl border-b border-gray-800">AtG Missile Mk. 1</div>
				<div class="flex flex-row flex-nowrap">
					<div class="flex-grow-0 flex-shrink-0 border-r border-gray-800">
						<img src="img/missile_mk.png" title="Click to copy give command" width="90" height="90" />
					</div>
					<div class="flex-grow p-1">
						<span class="is-offense">10%</span> chance to fire a missile that deals
						<span class="is-offense">300%</span> <span class="is-stackable">(+300% per stack)</span> TOTAL
						damage.
					</div>
				</div>
			</div>
			<div
				class="flex flex-col flex-nowrap overflow-hidden w-1/3 m-2 rounded-md border border-rare bg-rare shadow-md"
			>
				<div class="p-2 text-xl border-b border-gray-800">Ceremonial Dagger</div>
				<div class="flex flex-row flex-nowrap">
					<div class="flex-grow-0 flex-shrink-0 border-r border-gray-800">
						<img src="img/dagger.png" title="Click to copy give command" width="90" height="90" />
					</div>
					<div class="flex-grow p-1">
						Killing an enemy fires out <span class="is-offense">3 homing daggers</span> that deal
						<span class="is-offense">150%</span> <span class="is-stackable">(+150% per stack)</span> base
						damage.
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts"></script>

<style>
.item {
}
</style>
