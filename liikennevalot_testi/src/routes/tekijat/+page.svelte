<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import Modal from '../Modal.svelte';
	import Button from '../Button.svelte';
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
					TEKIJÄT
				{/snippet}
				<h2>Koodaus:</h2>
				<div class="nimet">
					<p>Oula Hämäläinen</p>
					<p>Juho Rajala</p>
				</div>

				<h2>Käyttöliittymä:</h2>
				<div class="nimet">
					<p>Hilla Korkiakoski</p>
					<p>Elias Hakala</p>
				</div>
				{#snippet footer()}
					<Button text="ETUSIVU" onclick={() => goto(resolve('/'))} />
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
		background-image: url('$lib/assets/720p/Bg_ai1.png');
		background-size: cover;
		background-position: top center;
		background-repeat: no-repeat;
		background-attachment: absolute;
		text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
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
	h2 {
		text-transform: uppercase;
		font-size: 16px;
		letter-spacing: 2px;
		margin-top: 18px;
		margin-bottom: 6px;
		text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
	}

	.nimet {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-bottom: 10px;
	}

	.nimet p {
		margin: 0;
		font-size: 12px;
		letter-spacing: 1px;

		padding: 4px 8px;
		text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
		width: fit-content;
	}
</style>
