<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import Modal from '../Modal.svelte';
	import Button from '../Button.svelte';
	import Minigame from './minigamemodal.svelte';

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
				<Minigame />
				{#snippet footer()}
					<Button text="ETUSIVU" onclick={() => goto(resolve('/'))} />
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
							alert('100');
							alert('99');
							alert('98');
							alert('97');
							alert('96');
							alert('95');
							alert('94');
							alert('93');
							alert('92');
							alert('91');
							alert('90');
							alert('89');
							alert('88');
							alert('87');
							alert('86');
							alert('85');
							alert('84');
							alert('83');
							alert('82');
							alert('81');
							alert('80');
							alert('79');
							alert('78');
							alert('77');
							alert('76');
							alert('75');
							alert('74');
							alert('73');
							alert('72');
							alert('71');
							alert('70');
							alert('69');
							alert('68');
							alert('67');
							alert('66');
							alert('65');
							alert('64');

							alert('63');
							alert('62');
							alert('61');
							alert('60');
							alert('59');
							alert('58');
							alert('57');
							alert('56');
							alert('55');
							alert('54');
							alert('53');
							alert('52');
							alert('51');
							alert('50');
							alert('49');
							alert('48');
							alert('47');
							alert('46');
							alert('45');
							alert('44');
							alert('43');
							alert('42');
							alert('41');
							alert('40');
							alert('39');
							alert('38');
							alert('37');
							alert('36');
							alert('35');
							alert('34');
							alert('33');
							alert('32');
							alert('31');
							alert('30');
							alert('29');
							alert('28');
							alert('27');
							alert('26');
							alert('25');
							alert('24');
							alert('23');
							alert('22');
							alert('21');
							alert('20');
							alert('19');
							alert('18');
							alert('17');
							alert('16');
							alert('15');
							alert('14');
							alert('13');
							alert('12');
							alert('11');
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
		font-size: 14px;
		letter-spacing: 2px;
		margin-top: 12px;
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
		background: rgba(255, 255, 255, 0.2);
		padding: 4px 8px;
		border: 2px solid black;
		box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
		width: fit-content;
	}
</style>
