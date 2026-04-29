<script lang="ts">
	import Button from './Button.svelte';
	import type Player from '$lib/components/Pelaaja.d.ts';
	import Character from './Character.svelte';
	import Valotolppa from './Valo.svelte';

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

		return () => window.removeEventListener('resize', updateScale);
	});

	// SKAALAUSASETUKSET LOPPUUU

	let maaliviiva: number = 750;
	let korkeus: number = $state(180);
	let peliKaynnissa: boolean = $state(false);
	let viesti = $state('Liikennevalot');
	let pelaajamaara: number = $state(2);
	let loopinVoitto: boolean = $state(false);

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
			setTimeout(() => alert(`${player.name} voitti!`), 100);

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

			setTimeout(() => alert(`${winner.name} voitti!`), 100);

			peliKaynnissa = false;
			clearTimeout(valoTimeout);
			valo = 'pois';
			viesti = 'Peli ohi! Aloita uusi kierros?';
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
	}
</script>

<div class="wrapper">
	<div class="game" style="transform: translate(-50%, -50%) scale({scale});">
		<div class="bg-box">
			<div class="bg-box-game">
				<div class="charcontentbox">
					<div class="charcontent">
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
				</div>
			</div>

			<div class="peli-ohjaus">
				<Button onclick={aloitaPeli} text="Aloita uusi kierros" disabled={peliKaynnissa} />
				<Button onclick={lisaaPelaaja} text="Lisää pelaaja +" disabled={pelaajamaara >= 4} />
				<Button onclick={poistaPelaaja} text="Poista pelaaja -" disabled={pelaajamaara <= 2} />
				<Button onclick={() => vaihdaVari(0)} text="{players[0].name} väri" />
				<Button onclick={() => vaihdaVari(1)} text="{players[1].name} väri" />
				<Button onclick={() => vaihdaVari(2)} text="{players[2].name} väri" />
				<Button onclick={() => vaihdaVari(3)} text="{players[3].name} väri" />

				<p>{viesti}</p>
			</div>
		</div>
		<div class="ui top-left">HUD</div>
		<div class="ui center">Game Area</div>
		<div class="ui bottom-right">Controls</div>
	</div>
</div>

<svelte:window onkeydown={handleKeydown} />

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
	.charcontentbox {
		position: fixed;
		left: 300px;
		top: 70px;
		width: 1280px; /* fixed size */
		height: 720px;
		overflow: hidden;
		position: relative;
	}
	.charcontent {
		transform: scale(0.75); /* adjust scale */
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
		position: fixed;
		top: 320px;
		left: 50%;
		transform: translateX(-50%);
		margin: 0 auto;
		/* border: solid; */
		/* background-color: #00ff00; */
	}
	.bg-box-game {
		position: fixed;
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
		background-attachment: fixed;
	}
	.fixedvalo {
		left: 940px;
		top: 0px;
		position: fixed;
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
