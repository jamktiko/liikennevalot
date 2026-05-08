<script lang="ts">
	interface Props {
		text?: string;
		valocolor: 'vihrea' | 'punainen' | 'pois';
		teema: number;
	}

	let { valocolor, teema }: Props = $props();

	const Tolppa = $derived(
		teema === 1 ? '/src/lib/assets/720p/lamppu.png' : `/src/lib/assets/720p/lamppu${teema}.png`
	);

	const Overlay = $derived(
		teema === 1
			? '/src/lib/assets/720p/lampunlamppu.png'
			: `/src/lib/assets/720p/lampunlamppu${teema}.png`
	);
</script>

<div class="stack">
	<img src={Tolppa} alt="Tolppa" class="layer" />

	<div class="liikennevalo {valocolor}"></div>

	<img src={Overlay} alt="Overlay" class="layer2" />
</div>

<style>
	.liikennevalo {
		position: absolute;

		width: 15%; /* 👈 scale with container */
		aspect-ratio: 1; /* keeps it a perfect circle */

		top: 7%; /* 👈 adjust these visually */
		left: 47.2%;
		transform: translateX(-50%);

		border-radius: 50%;
		background-color: rgb(0, 0, 0);

		transition: background-color 0.2s;
	}
	.vihrea {
		background-color: #00ff00;
		box-shadow: 0 0 1000px 50px #00ff00;
	}
	.punainen {
		background-color: #ff0000;
		box-shadow: 0 0 1000px 50px #ff0000;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: contain; /* or cover depending on your images */
	}
	.stack {
		--size: 150px; /* 👈 change this and everything scales */

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
	.layer2 {
		position: absolute;
		inset: 0; /* shorthand for top/left/right/bottom = 0 */
		width: 100%;
		height: 100%;
		opacity: 0.4;
	}
</style>
