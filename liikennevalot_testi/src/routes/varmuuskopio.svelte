<script lang="ts">
	import Button from './Button.svelte';
	import type Player from '$lib/components/Pelaaja.d.ts';

	let maaliviiva: number = 750;
	let korkeus: number = $state(180);
	let peliKaynnissa: boolean = $state(false);
	let viesti = $state('Liikennevalot');
	let pelaajamaara: number = $state(2);
	let loopinVoitto: boolean = $state(false);

	const speed: number = 150;

	let valo: 'pois' | 'vihrea' | 'punainen' = $state('pois');
	let varit = ['red', 'blue', 'pink', 'purple'];

	let players: Player[] = $state([
		{ key: 'q', x: 150, name: 'Pelaaja 1', dead: false, c: varit[0] },
		{ key: 'p', x: 150, name: 'Pelaaja 2', dead: false, c: varit[1] },
		{ key: 'c', x: 150, name: 'Pelaaja 3', dead: false, c: varit[2] },
		{ key: 'm', x: 150, name: 'Pelaaja 4', dead: false, c: varit[3] }
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

	let offset = 0;

	function vaihdaVari() {
		offset = (offset + 1) % varit.length;

		players.forEach((p, index) => {
			const nextIndex = (index + offset) % varit.length;
			p.c = varit[nextIndex];
		});
	}
</script>

<div class="fixed-pelialue">
	<div class="game-area" style="height: {korkeus}px;">
		{#each players.slice(0, pelaajamaara) as player, i (player.key)}
			<div
				class="character"
				style="transform: translateX({player.x}px); bottom: {20 +
					i * 80}px; background-color: {player.c}"
			>
				{player.key.toUpperCase()}
			</div>
		{/each}
	</div>
</div>

<div class="peli-ohjaus">
	<Button onclick={aloitaPeli} text="Aloita uusi kierros" disabled={peliKaynnissa} />
	<Button onclick={lisaaPelaaja} text="Lisää pelaaja +" disabled={pelaajamaara >= 4} />
	<Button onclick={poistaPelaaja} text="Poista pelaaja -" disabled={pelaajamaara <= 2} />
	<Button onclick={vaihdaVari} text="Vaihda väri" />

	<p>{viesti}</p>

	<div class="liikennevalo {valo}"></div>
	<div>
		<h2>Ohjeet</h2>

		<p>Player 1 = q <input type="text" placeholder="syötä nimi" /></p>
		<p>Player 2 = p <input type="text" placeholder="syötä nimi" /></p>
		<p>Player 3 = c <input type="text" placeholder="syötä nimi" /></p>
		<p>Player 4 = m <input type="text" placeholder="syötä nimi" /></p>
	</div>
</div>

<svelte:window onkeydown={handleKeydown} />

<style>
	.game-area {
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
		bottom: 20px;
		left: 40px;
		text-align: center;

		transition: transform 0.1s ease-out;
	}

	.liikennevalo {
		width: 300px;
		height: 300px;
		border-radius: 50%;
		background-color: gray;
		transition: background-color 0.2s;
	}
	.vihrea {
		background-color: #00ff00;
		box-shadow: 0 0 20px #00ff00;
	}
	.punainen {
		background-color: #ff0000;
		box-shadow: 0 0 20px #ff0000;
	}
	.peli-ohjaus {
		margin: 0 auto;
		text-align: center;
		font-family: Arial, sans-serif;
	}
	.fixed-pelialue {
		height: 340px;
		width: 900px;
		margin: 0 auto;
		border: solid;
	}
</style>
