<script lang="ts">
	// teema 1: päivä
	import character1 from '$lib/assets/1_paiva.png';
	import character2 from '$lib/assets/2_paiva.png';
	import character3 from '$lib/assets/3_paiva.png';
	import character4 from '$lib/assets/4_paiva.png';

	import paita1 from '$lib/assets/1_paita_paiva.png';
	import paita2 from '$lib/assets/2_paita_paiva.png';
	import paita3 from '$lib/assets/3_paita_paiva.png';
	import paita4 from '$lib/assets/4_paita_paiva.png';

	// teema 2: yö
	import character5 from '$lib/assets/1_teurastamo.png';
	import character6 from '$lib/assets/1_teurastamo.png';
	import character7 from '$lib/assets/1_teurastamo.png';
	import character8 from '$lib/assets/1_teurastamo.png';

	import paita5 from '$lib/assets/1_paita_teurastamo.png';
	import paita6 from '$lib/assets/1_paita_teurastamo.png';
	import paita7 from '$lib/assets/1_paita_teurastamo.png';
	import paita8 from '$lib/assets/1_paita_teurastamo.png';
	// teema 3: titanic
	import character9 from '$lib/assets/1_teurastamo.png';
	import character10 from '$lib/assets/1_teurastamo.png';
	import character11 from '$lib/assets/1_teurastamo.png';
	import character12 from '$lib/assets/1_teurastamo.png';

	import paita9 from '$lib/assets/1_paita_teurastamo.png';
	import paita10 from '$lib/assets/1_paita_teurastamo.png';
	import paita11 from '$lib/assets/1_paita_teurastamo.png';
	import paita12 from '$lib/assets/1_paita_teurastamo.png';

	// teema 4: teruastamo
	import character13 from '$lib/assets/1_teurastamo.png';
	import character14 from '$lib/assets/2_teurastamo.png';
	import character15 from '$lib/assets/1_teurastamo.png';
	import character16 from '$lib/assets/1_teurastamo.png';

	import paita13 from '$lib/assets/1_paita_teurastamo.png';
	import paita14 from '$lib/assets/2_paita_teurastamo.png';
	import paita15 from '$lib/assets/1_paita_teurastamo.png';
	import paita16 from '$lib/assets/1_paita_teurastamo.png';

	interface Props {
		text?: string;
		color: number;
		character: number;
		theme: number;
	}
	let { color, character, theme }: Props = $props();

	const themes: Record<
		number,
		{
			characters: string[];
			paidat: string[];
		}
	> = {
		1: {
			characters: [character1, character2, character3, character4],
			paidat: [paita1, paita2, paita3, paita4]
		},

		2: {
			characters: [character5, character6, character7, character8],
			paidat: [paita5, paita6, paita7, paita8]
		},
		3: {
			characters: [character9, character10, character11, character12],
			paidat: [paita9, paita10, paita11, paita12]
		},
		4: {
			characters: [character13, character14, character15, character16],
			paidat: [paita13, paita14, paita15, paita16]
		}
	};

	const currentTheme = $derived(themes[theme] ?? themes[1]);
</script>

<div class="stack">
	<div class="layer">
		<div class="vari" style="filter: sepia(1) saturate(1000%) hue-rotate({color}deg);">
			<img src={currentTheme.paidat[character]} alt="Pixel art walking character" />
		</div>
	</div>

	<img src={currentTheme.characters[character]} alt="Pixel art walking character" />

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
