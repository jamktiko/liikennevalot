<script lang="ts">
	import { fade, slide } from 'svelte/transition';

	interface Props {
		laskentaNro: number;
	}

	let { laskentaNro }: Props = $props();
</script>

<link
	href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
	rel="stylesheet"
/>

<div class="parent">
	<div class="contentbox">
		{#if laskentaNro === 3}
			<!-- <img src={numberthree} alt="3" in:fade out:slide /> -->
			<div
				in:fade
				out:slide
				class="mb-4 stroke-3 font-['Press_Start_2P'] text-6xl font-black tracking-tighter uppercase [text-shadow:4px_4px_0px_rgba(0,0,0,0.3)]"
			>
				3
			</div>
		{:else if laskentaNro === 2}
			<div
				in:fade
				out:slide
				class="mb-4 font-['Press_Start_2P'] text-6xl font-black tracking-tighter uppercase [text-shadow:4px_4px_0px_rgba(0,0,0,0.3)]"
			>
				2
			</div>
			<!-- <img src={numbertwo} alt="2" in:slide out:slide /> -->
		{:else if laskentaNro === 1}
			<div
				in:fade
				out:slide
				class="mb-4 font-['Press_Start_2P'] text-6xl font-black tracking-tighter uppercase [text-shadow:4px_4px_0px_rgba(0,0,0,0.3)]"
			>
				1
			</div>
			<!-- <img src={numberone} alt="1" in:slide out:slide /> -->
		{:else if laskentaNro >= 0}
			<div
				in:fade
				out:slide
				class="teksti mb-4 stroke-3 font-['Press_Start_2P'] text-8xl font-black tracking-tighter text-red-600 uppercase [text-shadow:4px_4px_0px_rgba(0,0,0,0.3)]"
			>
				GO!
			</div>
			<!-- <img src={go} alt="go" in:slide out:fade /> -->
		{/if}
	</div>
</div>

<style>
	.parent {
		height: 100%;
		margin: 0;
	}

	.contentbox {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.teksti {
		-webkit-text-stroke-width: 4px;
		-webkit-text-stroke-color: #000;
	}
</style>
