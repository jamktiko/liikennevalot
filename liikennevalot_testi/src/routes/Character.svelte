<script lang="ts">
	import character1 from '$lib/assets/hahmo1.png';
	import character2 from '$lib/assets/hahmo2.png';
	import character3 from '$lib/assets/hahmo3.png';
	import character4 from '$lib/assets/hahmo4.png';

	import character5 from '$lib/assets/hahmo5.png';
	import character6 from '$lib/assets/hahmo5.png';
	import character7 from '$lib/assets/hahmo5.png';
	import character8 from '$lib/assets/hahmo5.png';

	import paita1 from '$lib/assets/hahmo1_paita.png';
	import paita2 from '$lib/assets/hahmo2_paita.png';
	import paita3 from '$lib/assets/hahmo3_paita.png';
	import paita4 from '$lib/assets/hahmo4_paita.png';

	import paita5 from '$lib/assets/hahmo5_paita.png';
	import paita6 from '$lib/assets/hahmo5_paita.png';
	import paita7 from '$lib/assets/hahmo5_paita.png';
	import paita8 from '$lib/assets/hahmo5_paita.png';

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
