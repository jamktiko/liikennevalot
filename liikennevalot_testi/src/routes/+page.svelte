<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cubicIn } from 'svelte/easing';
	import { playSound, registerSound } from '$lib/components/sound';
	import Button from './Button.svelte';
	import type Player from '$lib/components/Pelaaja.d.ts';
	import Character from './Character.svelte';
	import Valotolppa from './Valo.svelte';
	import Laskenta from './Laskenta.svelte';
	import Modal from './Modal.svelte';
	import Etusivu from './Etusivu.svelte';
	import Pelaajavalinta from './Pelaajavalinta.svelte';
	import Tulostaulukko from './Tulostaulukko.svelte';
	import Asetukset from './Asetukset.svelte';
	import Raffle from './raffle.svelte';
	import Audiotesti from './audiotesti.svelte';
	// SKAALASAUSASETUKSET ALKAA

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

		// äänten rekisteröinti NIMI ja POLKU (tämän jälkeen käyttö playSound(NIMI))
		registerSound('hover', '/sounds/hover2.mp3');
		registerSound('countdown', '/sounds/countdown.mp3');
		registerSound('click', '/sounds/click.mp3');
		registerSound('light', '/sounds/redlight.mp3');

		return () => window.removeEventListener('resize', updateScale);
	});

	// SKAALAUSASETUKSET LOPPUUU

	let maaliviiva: number = 750;
	let korkeus: number = $state(180);
	let peliKaynnissa: boolean = $state(false);
	let laskentaKaynnissa = $state(false);
	let laskentaNro = $state(-1);
	let viesti = $state('Liikennevalot');
	let pelaajamaara: number = $state(2);
	let loopinVoitto: boolean = $state(false);
	let voittaja: Player | null = $state(null);
	let naytaModal: boolean = $state(false);
	let nakyma: 'etusivu' | 'valinta' | 'peli' = $state('etusivu');
	let naytaScoreboard: boolean = $state(false);
	let naytaAsetukset = $state(false);
	let juomapeli: boolean = $state(false);

	const speed: number = 150;

	let valo: 'pois' | 'vihrea' | 'punainen' = $state('pois');
	// let varit = ['red', 'blue', 'pink', 'purple'];

	let players: Player[] = $state([
		{
			key: 'q',
			x: 150,
			name: 'Pelaaja 1',
			dead: true,
			c: 0,
			character: 1,
			wins: 0,
			wrongInputs: 0
		},
		{
			key: 'p',
			x: 150,
			name: 'Pelaaja 2',
			dead: true,
			c: 72,
			character: 2,
			wins: 0,
			wrongInputs: 0
		},
		{
			key: 'c',
			x: 150,
			name: 'Pelaaja 3',
			dead: true,
			c: 144,
			character: 3,
			wins: 0,
			wrongInputs: 0
		},
		{
			key: 'm',
			x: 150,
			name: 'Pelaaja 4',
			dead: true,
			c: 288,
			character: 4,
			wins: 0,
			wrongInputs: 0
		}
	]);

	//pelkät nimet shotti komponenteille ja muille
	// let names = $derived(players.map((p) => p.name));

	let aktiivisetPelaajat: string[] = $state([]); // aktiivisten pelaajien nimet taulukkoon. funktiossa aloitaPeli

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
			player.wrongInputs++;
		} else if (valo === 'pois') {
			newPos -= speed; // rangaistus myös jos valo 'pois'
			player.wrongInputs++;
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
				voittaja = player;
				voittaja.wins++;
				naytaModal = true;
			}, 100);

			peliKaynnissa = false;
			clearTimeout(valoTimeout);
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
				voittaja = winner;
				voittaja.wins++;
				naytaModal = true;
			}, 100);

			peliKaynnissa = false;
			clearTimeout(valoTimeout);
			valo = 'pois';
			viesti = 'Peli ohi! Aloita uusi kierros?';
			voittaja = winner;
		}
	}

	function aloitaPeli() {
		if (laskentaKaynnissa || peliKaynnissa) return;

		laskentaKaynnissa = true;
		playSound('countdown');
		players.forEach((p) => {
			p.x = 150;
			p.dead = false;
			p.wrongInputs = 0;
		});

		paivitaPelaajat();

		aktiivisetPelaajat = players.filter((p) => !p.dead).map((p) => p.name.toUpperCase());

		peliKaynnissa = false; // varmistetaan ettei peli ala liian aikaisin

		viesti = '3';
		laskentaNro = 3;
		setTimeout(() => {
			viesti = '2';
			laskentaNro = 2;
			setTimeout(() => {
				viesti = '1';
				laskentaNro = 1;
				setTimeout(() => {
					viesti = 'GO!';
					laskentaNro = 0;
					setTimeout(() => {
						// trigger OUT animation
						laskentaNro = -1;

						// wait for transition to finish before removing component
						setTimeout(() => {
							peliKaynnissa = true;
							laskentaKaynnissa = false;
							pyoritaValoa();
						}, 300); // match your out: duration
					}, 500);
				}, 1000);
			}, 1000);
		}, 1000);
	}

	let valoTimeout: ReturnType<typeof setTimeout>;

	function pyoritaValoa() {
		if (!peliKaynnissa) return;

		valo = 'pois';
		viesti = 'Odota valoa...';

		const odotusaika = Math.floor(Math.random() * 4001) + 2000;

		valoTimeout = setTimeout(() => {
			if (!peliKaynnissa) return;

			valo = Math.random() > 0.3 ? 'vihrea' : 'punainen'; // todennäköisyys vihreälle valolle
			viesti = valo === 'vihrea' ? 'Vihreä valo!' : 'Punainen valo!';
			playSound('light');
			if (valo === 'vihrea') {
				loopinVoitto = false;
			}
			valoTimeout = setTimeout(() => {
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
		p.c = Math.floor(Math.random() * 360); // kierrä väriä 36 astetta (10 eri väriä)
		playSound('click');
	}

	function suljeModal() {
		naytaModal = false;
	}

	paivitaPelaajat();
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
		<div class="wrapper">
			<div class="game" style="transform: translate(-50%, -50%) scale({scale});">
				<div class="bg-box">
					<div class="bg-box-game">
						<div class="charcontentbox">
							<div class="charcontent">
								<div class="fixed-pelialue">
									<div class="game-area" style="height: {korkeus}px;">
										{#each players.slice(0, pelaajamaara) as player, i (player.key)}
											{#if !player.dead}
												<div
													class="character"
													style="transform: translateX({player.x}px); bottom: {20 + i * 80}px;"
													out:fly={{ x: -150, y: 200, duration: 1000, easing: cubicIn }}
												>
													<Character
														text={player.key.toUpperCase()}
														color={player.c}
														character={player.character}
													/>
												</div>
											{/if}
										{/each}
									</div>
									<div class="fixedvalo">
										<Valotolppa valocolor={valo} />
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="peli-ohjaus"></div>
				</div>

				{#if laskentaKaynnissa}
					<Laskenta {laskentaNro} />
				{/if}
				<div class="ui top-left">
					<Button onclick={aloitaPeli} text="ALOITA UUSI KIERROS" disabled={peliKaynnissa} />
					<Button onclick={() => (naytaScoreboard = true)} text="TULOKSET" />
					<Button onclick={() => (naytaAsetukset = true)} text="ASETUKSET" />
				</div>
				<div class="ui center">Game Area</div>
				<div class="ui bottom-right">
					<p>{viesti}</p>
					<Audiotesti />
				</div>
			</div>
		</div>
	</div>
{/if}
{#if naytaAsetukset}
	<Asetukset sulje={() => (naytaAsetukset = false)} bind:juomapeli />
{/if}
{#if naytaScoreboard}
	<Tulostaulukko players={players.slice(0, pelaajamaara)} sulje={() => (naytaScoreboard = false)} />
{/if}

{#if naytaModal && voittaja}
	<Modal>
		{#snippet header()}
			<h2>Voittaja!</h2>
		{/snippet}
		<p>Pelin voittaja on {voittaja?.name}!</p>
		<div
			class="char-box-shadow flex h-32 w-32 items-center justify-center overflow-hidden border-[4px] border-black bg-[#c0c0c0] md:h-40 md:w-40"
		>
			<div style="transform: scale(1.5) translateY(5px);">
				<Character color={voittaja.c} character={voittaja.character} />
			</div>
		</div>
		{#snippet footer()}
			{#if !juomapeli}
				<button
					onclick={suljeModal}
					class="btn-shadow w-full border-4 border-black bg-white py-4 text-[10px] font-bold uppercase transition-all [text-shadow:2px_2px_0px_rgba(0,0,0,0.2)] hover:bg-gray-50 active:translate-y-1 active:bg-gray-100 md:text-[12px]"
				>
					Pelaa uudelleen
				</button>
			{/if}
			{#if juomapeli}
				{#if Math.random() < 0.5}
					<div class="rafflecontainer">
						<Raffle nimet={aktiivisetPelaajat} {suljeModal} />
					</div>
				{:else}
					<button
						onclick={suljeModal}
						class="btn-shadow w-full border-4 border-black bg-white py-4 text-[10px] font-bold uppercase transition-all [text-shadow:2px_2px_0px_rgba(0,0,0,0.2)] hover:bg-gray-50 active:translate-y-1 active:bg-gray-100 md:text-[12px]"
					>
						Pelaa uudelleen
					</button>
				{/if}
				{#each players.slice(0, pelaajamaara) as player (player.key)}
					{#if player.wrongInputs === 1}
						<p>{player.name}: {player.wrongInputs} hörppy</p>
					{:else if player.wrongInputs > 1}
						<p>{player.name}: {player.wrongInputs} hörppyä</p>
					{/if}
				{/each}
			{/if}
		{/snippet}
	</Modal>
{/if}

<svelte:window onkeydown={handleKeydown} />

<style>
	:root {
		--fixed-top: 100px;
	}
	.game-area {
		position: absolute;
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
	.charcontentbox {
		position: absolute;
		left: 300px;
		top: 70px;
		width: 1280px; /* fixed size */
		height: 720px;
		overflow: hidden;
		position: relative;
	}
	.charcontent {
		transform: scale(0.75);
		transform-origin: top left; /* keep alignment */
		width: 900px; /* original size before scaling */
		height: 340px;
	}
	.character {
		width: 1em;
		font-size: 3rem;
		position: absolute;
		bottom: 0px;
		left: 40px;
		text-align: center;

		transition: transform 0.6s ease-out;
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
		position: absolute;
		top: 320px;
		left: 50%;
		transform: translateX(-50%);
		margin: 0 auto;
		/* border: solid; */
		/* background-color: #00ff00; */
	}
	.bg-box-game {
		position: absolute;
		top: 0px;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		max-width: 100%;
		height: 100%; /* or whatever height you need */

		background-image: url('$lib/assets/720p/Full_area.png');
		/* background-color: #ff0000; */
		background-position: center; /* keeps it centered */
		background-repeat: no-repeat; /* prevents tiling */
	}
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
	.fixedvalo {
		left: 940px;
		top: 0px;
		position: absolute;
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

	.ui {
		position: absolute;
		/* color: white; */
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
	.rafflecontainer {
		display: flex;
		justify-content: center; /* vaakasuora keskitys */
		align-items: center;
	}
</style>
