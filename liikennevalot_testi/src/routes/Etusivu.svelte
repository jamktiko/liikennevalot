<script lang="ts">
	import Button from './Button.svelte';

	// Otetaan vastaan uudet propsit pääohjelmasta
	let {
		aloita,
		lisaaPelaaja,
		poistaPelaaja,
		pelaajamaara
	}: {
		aloita: () => void;
		lisaaPelaaja: () => void;
		poistaPelaaja: () => void;
		pelaajamaara: number;
	} = $props();
</script>

<div class="aloitusruutu">
	<h1 class="pelin-otsikko">Liikennevalot 🚥</h1>
	<p>Testaa reaktionopeutesi kavereita vastaan!</p>
	<div class="asetukset">
		<h2>Pelaajamäärä</h2>

		<div class="pelaaja-laskuri">
			<button class="stepper-nappi" onclick={poistaPelaaja} disabled={pelaajamaara <= 2}>
				-
			</button>

			<span class="laskuri-teksti">Pelaajat: {pelaajamaara}</span>

			<button class="stepper-nappi" onclick={lisaaPelaaja} disabled={pelaajamaara >= 4}> + </button>
		</div>
	</div>

	<Button onclick={aloita} text="Pelaa" />
</div>

<style>
	.aloitusruutu {
		background-image: url('$lib/assets/tausta.png');
		width: 100%;
		height: 1080px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		text-align: center;
	}

	.pelin-otsikko {
		font-size: 4rem;
		margin: 0;
		color: #333;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
	}
	.asetukset {
		background-color: rgba(255, 255, 255, 0.85);
		padding: 20px 40px;
		border-radius: 12px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		margin-bottom: 20px;
	}

	.asetukset h2 {
		margin-top: 0;
		font-size: 1.5rem;
		color: #333;
	}

	.pelaaja-laskuri {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20px; /* Väli nappien ja tekstin välillä */
		margin-top: 15px;
	}

	.laskuri-teksti {
		font-size: 1.5rem;
		font-weight: bold;
		min-width: 120px; /* Pitää napit paikoillaan vaikka numero muuttuu */
	}

	.stepper-nappi {
		width: 45px;
		height: 45px;
		border-radius: 50%; /* Tekee napista täydellisen pyöreän */
		border: none;
		background-color: #333;
		color: white;
		font-size: 2rem;
		line-height: 1;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			background-color 0.2s,
			transform 0.1s;
	}

	.stepper-nappi:hover:not(:disabled) {
		background-color: #555;
		transform: scale(1.1); /* Pieni suurennusefekti kun hiiri on päällä */
	}

	.stepper-nappi:disabled {
		background-color: #ccc;
		cursor: not-allowed;
		opacity: 0.7;
	}
</style>
