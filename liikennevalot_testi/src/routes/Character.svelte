<script lang="ts">
	import character1 from '$lib/assets/hahmo1.png';
	import character2 from '$lib/assets/hahmo2.png';
	import character3 from '$lib/assets/hahmo3.png';
	import character4 from '$lib/assets/hahmo4.png';
	import paita1 from '$lib/assets/hahmo1_paita.png';
	import paita2 from '$lib/assets/hahmo2_paita.png';
	import paita3 from '$lib/assets/hahmo3_paita.png';
	import paita4 from '$lib/assets/hahmo4_paita.png';

	interface Props {
		text?: string;
		color: number;
		character: number;
		theme: number;
	}
	let { color, character }: Props = $props();

	const characters = [character1, character2, character3, character4];
	const paidat = [paita1, paita2, paita3, paita4];
</script>

<div class="stack">
	<div class="layer">
		<div class="vari" style="filter: sepia(1) saturate(1000%) hue-rotate({color}deg);">
			<img src={paidat[character]} alt="Pixel art walking character" />
		</div>
	</div>
	<img src={characters[character]} alt="Pixel art walking character" />
	<div class="layer"></div>
</div>

<style>
	.vari {
		filter: sepia(1) saturate(1000%) hue-rotate(0deg);
		color: rgb(24, 24, 24);
	}
	img {
		height: 80px;
		width: 100%;
	}
	.stack {
		--size: 40px; /* positio ylös alas että näkyy kaikki pelaajat. 40px */

		position: relative;
		width: var(--size);
		height: calc(var(--size) * 2); /* keep aspect ratio */
	}

	.layer {
		position: absolute;
		inset: 0; /* shorthand for top/left/right/bottom = 0 */
		width: 100%;
		height: 100%;
	}
	.stack {
		--size: 40px; /* positio ylös alas että näkyy kaikki pelaajat. 40px */

		position: relative;
		width: var(--size);
		height: calc(var(--size) * 2); /* keep aspect ratio */
	}

	.layer {
		position: absolute;
		inset: 0; /* shorthand for top/left/right/bottom = 0 */
		width: 100%;
		height: 100%;
	}
</style>
