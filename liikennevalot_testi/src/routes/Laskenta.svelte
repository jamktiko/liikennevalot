<script lang="ts">
	import numberthree from '$lib/assets/3.png';
	import numbertwo from '$lib/assets/2.png';
	import numberone from '$lib/assets/1.png';
	import go from '$lib/assets/go.png';
	import { fade, slide } from 'svelte/transition';
	interface Props {
		laskentaNro: number;
	}

	let { laskentaNro }: Props = $props();
</script>

<div class="parent">
	<div class="contentbox">
		{#if laskentaNro === 3}
			<img src={numberthree} alt="3" in:fade out:slide />
		{:else if laskentaNro === 2}
			<img src={numbertwo} alt="2" in:slide out:slide />
		{:else if laskentaNro === 1}
			<img src={numberone} alt="1" in:slide out:slide />
		{:else if laskentaNro >= 0}
			<img src={go} alt="go" in:slide out:fade />
		{/if}
	</div>
</div>

<style>
	.parent {
		height: 100%;
		margin: 0;
	}
	img {
		width: 200px;
		height: 200px;
	}
	.contentbox {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
