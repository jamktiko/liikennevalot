<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import Modal from '../Modal.svelte';

	let scale = $state(1);
	function updateScale() {
		const baseWidth = 1280;
		const baseHeight = 720;
		const scaleX = window.innerWidth / baseWidth;
		const scaleY = window.innerHeight / baseHeight;
		scale = Math.min(scaleX, scaleY);
	}
	onMount(() => {
		updateScale();
		window.addEventListener('resize', updateScale);
	});
</script>

<div class="wrapper">
	<div class="game" style="transform: translate(-50%, -50%) scale({scale});">
		<div class="bg-box">
			<Modal>
				{#snippet header()}
					CREDITS
				{/snippet}
				asds
				{#snippet footer()}
					asdasd
				{/snippet}
			</Modal>
		</div>
	</div>
</div>

<style>
	.bg-box {
		width: 100%;
		margin: 0;
		height: 720px;
		max-width: 100%;
		background-image: url('$lib/assets/720p/Bg_ai.png');
		background-size: cover;
		background-position: top center;
		background-repeat: no-repeat;
		background-attachment: absolute;
	}
	.wrapper {
		width: 100vw;
		height: 100vh;
		position: relative;
		background: #111;
		overflow: hidden;
	}
	.game {
		width: 1280px;
		height: 720px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform-origin: center;
		background: #222;
	}
</style>
