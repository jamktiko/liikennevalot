import type Player from '$lib/components/Pelaaja.d.ts';
import { playSound } from '$lib/components/sound';

class Pelimoottori {
	// --- ASETUKSET ---
	maaliviiva: number = 750;
	speed: number = 150;

	// --- PELIN TILA ---
	korkeus: number = $state(180);
	pelaajamaara: number = $state(2);
	peliKaynnissa: boolean = $state(false);
	laskentaKaynnissa: boolean = $state(false);
	laskentaNro: number = $state(-1);
	viesti: string = $state('Liikennevalot');
	loopinVoitto: boolean = $state(false);
	valo: 'pois' | 'vihrea' | 'punainen' = $state('pois');
	voittaja: Player | null = $state(null);
	aktiivisetPelaajat: string[] = $state([]);
	vitsi: string = $state('');
	ladataanVitsiä: boolean = $state(false);

	valoTimeout: ReturnType<typeof setTimeout> | undefined;

	// Callback-funktio, jota kutsutaan kun peli voitetaan
	onWin: () => void = () => {};

	players: Player[] = $state([
		{
			key: 'q',
			x: 150,
			name: 'Pelaaja 1',
			dead: true,
			c: 0,
			character: 0,
			wins: 0,
			wrongInputs: 0
		},
		{
			key: 'p',
			x: 150,
			name: 'Pelaaja 2',
			dead: true,
			c: 72,
			character: 1,
			wins: 0,
			wrongInputs: 0
		},
		{
			key: 'c',
			x: 150,
			name: 'Pelaaja 3',
			dead: true,
			c: 144,
			character: 2,
			wins: 0,
			wrongInputs: 0
		},
		{
			key: 'm',
			x: 150,
			name: 'Pelaaja 4',
			dead: true,
			c: 288,
			character: 3,
			wins: 0,
			wrongInputs: 0
		}
	]);

	// --- FUNKTIOT ---

	handleKeydown = (event: KeyboardEvent): void => {
		if (!this.peliKaynnissa) return;
		const player = this.players.find((p) => p.key === event.key);

		if (!player || player.dead) return;

		let newPos = player.x;

		if (this.valo === 'vihrea') {
			if (this.loopinVoitto) return;
			newPos += this.speed;
			this.loopinVoitto = true;
		} else if (this.valo === 'punainen') {
			newPos -= this.speed;
			player.wrongInputs++;
		} else if (this.valo === 'pois') {
			newPos -= this.speed;
			player.wrongInputs++;
		}

		if (newPos < 0) {
			player.x = newPos;
			player.dead = true;
			this.tarkistaVoittaja();
			playSound('scream');
			this.haeDadJoke();
			return;
		}

		player.x = newPos;
		this.tarkistaVoittaja();

		if (newPos >= this.maaliviiva) {
			setTimeout(() => {
				this.voittaja = player;
				this.voittaja.wins++;
				this.onWin();
			}, 100);

			this.peliKaynnissa = false;
			this.haeDadJoke();
			clearTimeout(this.valoTimeout);
			this.valo = 'pois';
			this.viesti = 'Peli ohi! Aloita uusi kierros?';
		}
	};

	tarkistaVoittaja = () => {
		if (!this.peliKaynnissa) return;
		const alivePlayers = this.players.filter((p) => !p.dead);

		if (alivePlayers.length === 1) {
			const winner = alivePlayers[0];

			setTimeout(() => {
				this.voittaja = winner;
				this.voittaja.wins++;
				this.onWin();
			}, 100);

			this.peliKaynnissa = false;
			clearTimeout(this.valoTimeout);
			this.valo = 'pois';
			this.viesti = 'Peli ohi! Aloita uusi kierros?';
			this.voittaja = winner;
		}
	};

	aloitaPeli = () => {
		if (this.laskentaKaynnissa || this.peliKaynnissa) return;

		this.laskentaKaynnissa = true;
		playSound('countdown');
		this.players.forEach((p) => {
			p.x = 150;
			p.dead = false;
			p.wrongInputs = 0;
		});

		this.paivitaPelaajat();

		this.aktiivisetPelaajat = this.players.filter((p) => !p.dead).map((p) => p.name.toUpperCase());
		this.peliKaynnissa = false;

		this.viesti = '3';
		this.laskentaNro = 3;
		setTimeout(() => {
			this.viesti = '2';
			this.laskentaNro = 2;
			setTimeout(() => {
				this.viesti = '1';
				this.laskentaNro = 1;
				setTimeout(() => {
					this.viesti = 'GO!';
					this.laskentaNro = 0;
					setTimeout(() => {
						this.laskentaNro = -1;
						setTimeout(() => {
							this.peliKaynnissa = true;
							this.laskentaKaynnissa = false;
							this.pyoritaValoa();
						}, 300);
					}, 500);
				}, 1000);
			}, 1000);
		}, 1000);
	};

	pyoritaValoa = () => {
		if (!this.peliKaynnissa) return;

		this.valo = 'pois';
		this.viesti = 'Odota valoa...';

		const odotusaika = Math.floor(Math.random() * 4001) + 2000;

		this.valoTimeout = setTimeout(() => {
			if (!this.peliKaynnissa) return;

			this.valo = Math.random() > 0.3 ? 'vihrea' : 'punainen';
			this.viesti = this.valo === 'vihrea' ? 'Vihreä valo!' : 'Punainen valo!';
			playSound('light');
			if (this.valo === 'vihrea') {
				this.loopinVoitto = false;
			}
			this.valoTimeout = setTimeout(() => {
				if (!this.peliKaynnissa) return;
				this.valo = 'pois';
				this.pyoritaValoa();
			}, 2000);
		}, odotusaika);
	};

	lisaaPelaaja = () => {
		this.korkeus += 80;
		this.pelaajamaara++;
		this.paivitaPelaajat();
	};

	poistaPelaaja = () => {
		this.korkeus -= 80;
		this.pelaajamaara--;
		this.paivitaPelaajat();
	};

	paivitaPelaajat = () => {
		this.players.forEach((p, index) => {
			p.dead = index >= this.pelaajamaara;
		});
	};

	vaihdaVari = (x: number) => {
		const p = this.players[x];
		p.c = Math.floor(Math.random() * 360);
		playSound('click');
	};
	async haeDadJoke() {
		this.ladataanVitsiä = true;
		let vitsiLoytyi = false;
		let yritykset = 0;

		// Määritä maksimipituus merkeissä
		const MAX_PITUUS = 100;

		try {
			// Yritetään hakea vitsiä enintään 5 kertaa
			while (!vitsiLoytyi && yritykset < 5) {
				yritykset++;

				const response = await fetch('https://icanhazdadjoke.com/', {
					headers: { Accept: 'application/json' }
				});

				if (!response.ok) throw new Error('Yhteysvirhe');

				const data = await response.json();

				// Tarkistetaan, onko vitsi riittävän lyhyt
				if (data.joke.length <= MAX_PITUUS) {
					this.vitsi = data.joke;
					vitsiLoytyi = true;
				}
			}

			// Jos 5 yrityksen jälkeenkään ei löytynyt lyhyttä vitsiä, annetaan oletusvitsi
			if (!vitsiLoytyi) {
				this.vitsi =
					'Why do fathers take an extra pair of socks when they go golfing? In case they get a hole in one!';
			}

			this.ladataanVitsiä = false;
		} catch (error) {
			console.error('Virhe:', error);
			this.vitsi = 'Vitsien haku epäonnistui, mutta olet silti voittaja!';
			this.ladataanVitsiä = false;
		}
	}
}

export const moottori = new Pelimoottori();
