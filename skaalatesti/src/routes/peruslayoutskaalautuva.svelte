<script>
	import { onMount } from 'svelte';

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

		return () => window.removeEventListener('resize', updateScale);
	});
</script>

<div class="wrapper">
	<div class="game" style="transform: translate(-50%, -50%) scale({scale});">
		<div class="ui top-left">HUD</div>
		<div class="ui center">Game Area</div>
		<div class="ui bottom-right">Controls</div>
	</div>
</div>

<style>
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

	.ui {
		position: absolute;
		color: white;
	}

	.top-left {
		top: 10px;
		left: 10px;
	}

	.center {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.bottom-right {
		bottom: 10px;
		right: 10px;
	}
</style>
