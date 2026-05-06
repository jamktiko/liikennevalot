<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cubicIn } from 'svelte/easing';
	import { registerSound, withClickSound } from '$lib/components/sound';
	import { onMount } from 'svelte';

	// Tuodaan pelimoottori
	import { moottori } from '$lib/pelimoottori.svelte';

	import Button from './Button.svelte';
	import Character from './Character.svelte';
	import Valotolppa from './Valo.svelte';
	import Laskenta from './Laskenta.svelte';
	import Modal from './Modal.svelte';
	import Etusivu from './Etusivu.svelte';
	import Pelaajavalinta from './Pelaajavalinta.svelte';
	import Tulostaulukko from './Tulostaulukko.svelte';
	import Asetukset from './Asetukset.svelte';
	import Raffle from './raffle.svelte';
	import Nappaimetguide from './Nappaimetguide.svelte';
	import Otsikko from './Otsikko.svelte';

	// --- UI-TILA ---
	let scale = $state(1);
	let naytaModal: boolean = $state(false);
	let nakyma: 'etusivu' | 'valinta' | 'peli' = $state('etusivu');
	let naytaScoreboard: boolean = $state(false);
	let naytaAsetukset = $state(false);
	let juomapeli: boolean = $state(false);

	// Kytketään moottorin voitto-tapahtuma käyttöliittymän modaaliin
	moottori.onWin = () => {
		naytaModal = true;
	};

	function suljeModal() {
		naytaModal = false;
	}

	// --- SKAALAUSASETUKSET ---
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

		registerSound('hover', '/sounds/hover2.mp3');
		registerSound('countdown', '/sounds/countdown.mp3');
		registerSound('click', '/sounds/click.mp3');
		registerSound('light', '/sounds/redlight.mp3');
		registerSound('scream', '/sounds/scream.mp3');

		// Varmistetaan, että pelaajat päivitetään kerran mounttauksen yhteydessä
		moottori.paivitaPelaajat();

		return () => window.removeEventListener('resize', updateScale);
	});
</script>

<svelte:window onkeydown={moottori.handleKeydown} />

<div class="wrapper">
	<div class="game" style="transform: translate(-50%, -50%) scale({scale});">
		<div class="bg-box">
			{#if nakyma === 'etusivu'}
				<div class="logo" transition:fade={{ duration: 300 }}>
					<Otsikko />
				</div>
				<div class="valikkocontainer" transition:fade={{ duration: 300 }}>
					<Etusivu
						aloita={() => (nakyma = 'valinta')}
						lisaaPelaaja={moottori.lisaaPelaaja}
						poistaPelaaja={moottori.poistaPelaaja}
						pelaajamaara={moottori.pelaajamaara}
					/>
				</div>
			{:else if nakyma === 'valinta'}
				<div class="logo" transition:fade={{ duration: 300 }}>
					<Otsikko />
				</div>
				<div class="valikkocontainer" transition:fade={{ duration: 300 }}>
					<Pelaajavalinta
						players={moottori.players}
						pelaajamaara={moottori.pelaajamaara}
						vaihdaVari={moottori.vaihdaVari}
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
							{#if !moottori.peliKaynnissa}
								<div transition:fade={{ duration: 1000 }}>
									<Nappaimetguide players={moottori.players.slice(0, moottori.pelaajamaara)} />
								</div>
							{/if}
							<div class="charcontentbox">
								<div class="charcontent">
									<div class="fixed-pelialue">
										<div class="game-area" style="height: {moottori.korkeus}px;">
											{#each moottori.players.slice(0, moottori.pelaajamaara) as player, i (player.key)}
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
											<Valotolppa valocolor={moottori.valo} />
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="peli-ohjaus"></div>
					</div>

					{#if moottori.laskentaKaynnissa}
						<Laskenta laskentaNro={moottori.laskentaNro} />
					{/if}
					<div class="ui top-left">
						<Button
							onclick={moottori.aloitaPeli}
							text="ALOITA UUSI KIERROS"
							disabled={moottori.peliKaynnissa}
						/>
						<Button onclick={() => (naytaScoreboard = true)} text="TULOKSET" />
						<Button onclick={() => (naytaAsetukset = true)} text="ASETUKSET" />
					</div>
					<div class="ui center"></div>
					<div class="ui bottom-right">
						<p>{moottori.viesti}</p>
					</div>
				</div>
			{/if}
		</div>

		{#if naytaAsetukset}
			<Asetukset sulje={() => (naytaAsetukset = false)} bind:juomapeli />
		{/if}
		{#if naytaScoreboard}
			<Tulostaulukko
				players={moottori.players.slice(0, moottori.pelaajamaara)}
				sulje={() => (naytaScoreboard = false)}
			/>
		{/if}

		{#if naytaModal && moottori.voittaja}
			<Modal>
				{#snippet header()}
					<h2>Voittaja!</h2>
				{/snippet}
				<p>Pelin voittaja on {moottori.voittaja?.name.toUpperCase()}!</p>
				<div
					class="char-box-shadow flex h-32 w-32 items-center justify-center overflow-hidden border-[4px] border-black bg-[#c0c0c0] md:h-40 md:w-40"
				>
					<div style="transform: scale(1.5) translateY(5px);">
						<Character color={moottori.voittaja.c} character={moottori.voittaja.character} />
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
								<Raffle nimet={moottori.aktiivisetPelaajat} {suljeModal} />
							</div>
						{:else}
							<button
								onclick={suljeModal}
								class="btn-shadow w-full border-4 border-black bg-white py-4 text-[10px] font-bold uppercase transition-all [text-shadow:2px_2px_0px_rgba(0,0,0,0.2)] hover:bg-gray-50 active:translate-y-1 active:bg-gray-100 md:text-[12px]"
							>
								Pelaa uudelleen
							</button>
						{/if}
						{#each moottori.players.slice(0, moottori.pelaajamaara) as player (player.key)}
							{#if player.wrongInputs === 1}
								<p>{player.name.toUpperCase()}: {player.wrongInputs} hörppy</p>
							{:else if player.wrongInputs > 1}
								<p>{player.name.toUpperCase()}: {player.wrongInputs} hörppyä</p>
							{/if}
						{/each}
					{/if}
				{/snippet}
			</Modal>
		{/if}
	</div>
</div>

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
		position: relative;
		overflow: hidden;
		margin-bottom: 20px;
		border-radius: 8px;
		transition: height 0.3s ease;
		margin: 0 auto;
	}
	.charcontentbox {
		position: absolute;
		left: 300px;
		top: 70px;
		width: 1280px;
		height: 720px;
		overflow: hidden;
	}
	.charcontent {
		transform: scale(0.75);
		transform-origin: top left;
		width: 900px;
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
		z-index: 10;
	}
	.bg-box-game {
		position: absolute;
		top: 0px;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		max-width: 100%;
		height: 100%;
		background-image: url('$lib/assets/720p/Full_area.png');
		background-position: center;
		background-repeat: no-repeat;
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
		justify-content: center;
		align-items: center;
	}
	.logo {
		position: absolute;
		top: 12%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.valikkocontainer {
		position: absolute;
		top: 55%;
		left: 50%;
		transform: translate(-50%);
		width: 70%;
	}
</style>
