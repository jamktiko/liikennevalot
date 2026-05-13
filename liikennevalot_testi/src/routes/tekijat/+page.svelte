<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import Modal from '../Modal.svelte';
	import Button from '../Button.svelte';
	import Minigame from './minigamemodal.svelte';
	import Screensaver from './screensaver.svelte';
	let screensaver: { startSaver: () => void; stopSaver: () => void };

	let showExtras = $state(false);
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
		screensaver.startSaver();
	});
	function toggleExtras() {
		showExtras = !showExtras;
	}
</script>

<div class="wrapper">
	<div class="game" style="transform: translate(-50%, -50%) scale({scale});">
		<div class="screensaver-container">
			<Screensaver bind:this={screensaver} />
		</div>

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

				<div class="top-right">
					<Button
						text="SUPPORT US"
						onclick={() =>
							window.open(
								'https://qr.mobilepay.fi/box/b64335c7-fcbd-4d35-8ced-86a53321f620/pay-in',
								'_blank'
							)}
					/>
				</div>
				{#if showExtras}
					<div class="overlay">
						<div class="extras">
							<Minigame />
							<div class="center">
								<Button
									text="JARKKOMODE älä paina tätä"
									onclick={() => {
										alert('Morjens');
										alert('Mitä kuuluu?');
										alert('Vai kuuluuko?');
										alert('Saako tälläisesta koodista plussaa?');
										alert('Vai katsotaanko tätä pahalla.');
										alert('Ei mulla muuta');
										alert('Kiitos');
										alert('Hei');
										alert('10');
										alert('9');
										alert('8');
										alert('7');
										alert('6');
										alert('5');
										alert('4');
										alert('3');
										alert('2');
										alert('1');
										alert('hähää vielä 5');
										alert('5');
										alert('4');
										alert('3');
										alert('2');
										alert('1');
										alert('NYT');
										alert('vai?');
										alert('NYT');
										alert('OK');
									}}
								/>
							</div>

							<div class="bottom-right">
								<Button text="SULJE" onclick={() => (showExtras = false)} />
							</div>
						</div>
					</div>
				{/if}
				<Button text="EXTRAS" onclick={toggleExtras} />

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
		background-image: url('/assets/720p/Bg_ai1.png');
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
	.extras {
		position: fixed;
		z-index: 1000;

		background: white;
		padding: 2rem;
		border: solid 4px black;
		border-radius: 12px;
		min-width: 300px;
		width: 400px;
		height: 300px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.overlay {
		position: fixed;
		inset: 0;
		/* background: rgba(0, 0, 0, 0.2); */
		z-index: 999;
	}
	.bottom-right {
		position: absolute;
		bottom: 10px;
		right: 10px;
	}
	.center {
		padding: 5px;
	}
	.top-right {
		position: absolute;
		top: 10px;
		right: 10px;
	}
	.screensaver-container {
		position: absolute;
		inset: 0;
		z-index: 41; /* behind everything else */
	}
</style>
