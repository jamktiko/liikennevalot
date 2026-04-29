<script lang="ts">
	import { fade } from 'svelte/transition';
	import Button from './Button.svelte';
	import type Player from '$lib/components/Pelaaja.d.ts';
	import Character from './Character.svelte';
	import Valotolppa from './Valo.svelte';
	import Modal from './Modal.svelte';
	import Etusivu from './Etusivu.svelte';
	import Pelaajavalinta from './Pelaajavalinta.svelte';

	let maaliviiva: number = 750;
	let korkeus: number = $state(180);
	let peliKaynnissa: boolean = $state(false);
	let viesti = $state('Liikennevalot');
	let pelaajamaara: number = $state(2);
	let loopinVoitto: boolean = $state(false);
	let voittajanNimi: string = $state('');
	let naytaModal: boolean = $state(false);
	let nakyma: 'etusivu' | 'valinta' | 'peli' = $state('etusivu');

	const speed: number = 150;

	let valo: 'pois' | 'vihrea' | 'punainen' = $state('pois');
	// let varit = ['red', 'blue', 'pink', 'purple'];

	let players: Player[] = $state([
		{ key: 'q', x: 150, name: 'Pelaaja 1', dead: false, c: 0, character: 1 },
		{ key: 'p', x: 150, name: 'Pelaaja 2', dead: false, c: 72, character: 2 },
		{ key: 'c', x: 150, name: 'Pelaaja 3', dead: false, c: 144, character: 3 },
		{ key: 'm', x: 150, name: 'Pelaaja 4', dead: false, c: 288, character: 4 }
	]);

	// näppäin funktio
	function handleKeydown(event: KeyboardEvent): void {
		if (!peliKaynnissa) return;
		const player = players.find((p) => p.key === event.key);

		if (!player) return;
		if (player.dead) return; // dead check

		let newPos = player.x;

		if (valo === 'vihrea') {
			if (loopinVoitto) return; // ei inputteja nopeimman pelaajan jälkeen vihreällä valolla
			newPos += speed;
			loopinVoitto = true;
		} else if (valo === 'punainen') {
			newPos -= speed; // rangaistus punaisella valolla
		} else if (valo === 'pois') {
			newPos -= speed; // rangaistus myös jos valo 'pois'
		}

		// pelaaja kuolee jos positio alle 0, samalla tarkastetaan onko voittajaa (jos yksi jäljellä)
		if (newPos < 0) {
			player.x = newPos;
			player.dead = true;
			tarkistaVoittaja();
			return;
		}

		player.x = newPos;
		tarkistaVoittaja();
		//voittaja jos maaliviiva ylitetään
		if (newPos >= maaliviiva) {
			setTimeout(() => {
				voittajanNimi = player.name;
				naytaModal = true;
			}, 100);

			peliKaynnissa = false;
			valo = 'pois';
			viesti = 'Peli ohi! Aloita uusi kierros?';
		}
	}

	// pelaajien dead tilan tarkastus ja jos ainoastaan yksi dead=false niin voittaja.
	function tarkistaVoittaja() {
		if (!peliKaynnissa) return;
		const alivePlayers = players.filter((p) => !p.dead);

		if (alivePlayers.length === 1) {
			const winner = alivePlayers[0];

			setTimeout(() => {
				voittajanNimi = winner.name;
				naytaModal = true;
			}, 100);

			peliKaynnissa = false;
			valo = 'pois';
			viesti = 'Peli ohi! Aloita uusi kierros?';
			voittajanNimi = winner.name;
		}
	}

	function aloitaPeli() {
		players.forEach((p) => {
			p.x = 150;
			p.dead = false;
		});

		paivitaPelaajat();

		peliKaynnissa = true;
		pyoritaValoa();
	}

	function pyoritaValoa() {
		if (!peliKaynnissa) return;

		valo = 'pois';
		viesti = 'Odota valoa...';

		const odotusaika = Math.floor(Math.random() * 4001) + 2000;

		setTimeout(() => {
			if (!peliKaynnissa) return;

			valo = Math.random() > 0.3 ? 'vihrea' : 'punainen'; // todennäköisyys vihreälle valolle
			viesti = valo === 'vihrea' ? 'Vihreä valo!' : 'Punainen valo!';

			if (valo === 'vihrea') {
				loopinVoitto = false;
			}
			setTimeout(() => {
				if (!peliKaynnissa) return;
				valo = 'pois';
				pyoritaValoa();
			}, 2000);
		}, odotusaika);
	}

	function lisaaPelaaja() {
		korkeus += 80;
		pelaajamaara++;
		paivitaPelaajat();
	}

	function poistaPelaaja() {
		korkeus -= 80;
		pelaajamaara--;
		paivitaPelaajat();
	}

	// päivittää pelaajamäärä muuttujasta pelaajille dead=true jotka eivät ole pelissä
	function paivitaPelaajat() {
		players.forEach((p, index) => {
			p.dead = index >= pelaajamaara;
		});
	}

	// let offset = 0;  // vanha funktio värien vaihtoon (kierrättää väri taulukkoa)

	// function vaihdaVari(x: number) {
	// 	offset = (offset + 1) % varit.length;

	// 	const p = players[x];
	// 	const nextIndex = (x + offset) % varit.length;
	// 	p.c = varit[nextIndex];
	// }

	function vaihdaVari(x: number) {
		const p = players[x];
		p.c = (p.c + 36) % 360; // kierrä väriä 36 astetta (10 eri väriä)
	}

	function suljeModal() {
		naytaModal = false;
	}
</script>

{#if nakyma === 'etusivu'}
	<div transition:fade={{ duration: 300 }}>
		<Etusivu aloita={() => (nakyma = 'valinta')} {lisaaPelaaja} {poistaPelaaja} {pelaajamaara} />
	</div>
{:else if nakyma === 'valinta'}
	<div transition:fade={{ duration: 300 }}>
		<Pelaajavalinta
			{players}
			{pelaajamaara}
			{vaihdaVari}
			pelaa={() => {
				nakyma = 'peli';
			}}
			takaisin={() => (nakyma = 'etusivu')}
		/>
	</div>
{:else}
	<div transition:fade={{ duration: 300 }}>
		<div class="bg-box">
			<div class="bg-box-game">
				<div class="fixed-pelialue">
					<div class="game-area" style="height: {korkeus}px;">
						{#each players.slice(0, pelaajamaara) as player, i (player.key)}
							<div
								class="character"
								style="transform: translateX({player.x}px); bottom: {20 + i * 80}px; "
							>
								<Character
									text={player.key.toUpperCase()}
									color={player.c}
									character={player.character}
								/>
							</div>
						{/each}
					</div>
					<div class="fixedvalo">
						<Valotolppa valocolor={valo} />
					</div>
				</div>
			</div>

			<div class="peli-ohjaus">
				<Button onclick={aloitaPeli} text="Aloita uusi kierros" disabled={peliKaynnissa} />

				<p>{viesti}</p>
			</div>
		</div>
	</div>
{/if}

<svelte:window onkeydown={handleKeydown} />

{#if naytaModal}
	<Modal>
		{#snippet header()}
			<h2>Voittaja!</h2>
		{/snippet}
		<p>Pelin voittaja on {voittajanNimi}!</p>
		{#snippet footer()}
			<Button onclick={suljeModal} disabled={false} text="Sulje" />
		{/snippet}
	</Modal>
{/if}

<style>
	:root {
		--fixed-top: 100px;
	}
	.game-area {
		position: fixed;
		top: 0px;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		min-width: 900px;
		max-width: 900px;
		height: 180px;
		max-height: 340px;
		min-height: 180px;
		/* background-color: #e0f7fa; */
		position: relative;
		overflow: hidden;
		margin-bottom: 20px;

		/* border: 2px solid #333; */
		border-radius: 8px;
		transition: height 0.3s ease;
		margin: 0 auto;
	}

	.character {
		width: 1em;
		font-size: 3rem;
		position: absolute;
		bottom: 0px;
		left: 40px;
		text-align: center;

		transition: transform 0.1s ease-out;
	}

	.peli-ohjaus {
		position: relative;
		/* top: 500px; */
		height: 50px;
		left: 50%;
		transform: translateX(-50%);
		margin: 0 auto;
		text-align: center;
		font-family: Arial, sans-serif;
	}
	.fixed-pelialue {
		position: fixed;
		top: 0px;
		left: 50%;
		transform: translateX(-50%);
		height: 320px;
		width: 900px;
		margin: 0 auto;
		/* border: solid; */
		/* background-color: #00ff00; */
	}
	.bg-box-game {
		position: fixed;
		top: 350px;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		height: 320px; /* or whatever height you need */

		background-image: url('$lib/assets/Game-area2.png');
		/* background-color: #ff0000; */
		background-position: center; /* keeps it centered */
		background-repeat: no-repeat; /* prevents tiling */
	}
	.bg-box {
		width: 100%;
		margin: 0;
		height: 1080px;

		background-image: url('$lib/assets/tausta.png');
		background-size: cover;

		background-position: top center;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}
	.fixedvalo {
		left: 920px;
		top: -200px;
		position: fixed;
	}
</style>
