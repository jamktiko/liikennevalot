<script lang="ts">
	import Tolppa from '$lib/assets/LIIKENNEVALO_TOLPPA.png';
	// import Valo from '$lib/assets/LIIKENNEVALO_VALO_G.png';
	import Overlay from '$lib/assets/LIIKENNEVALO_OVERLAY.png';

	interface Props {
		text?: string;
		valocolor: 'vihrea' | 'punainen' | 'pois';
	}
	let { valocolor }: Props = $props();
</script>

<div class="stack">
	<img src={Tolppa} alt="Tolppa" class="layer" />
	<img src={Overlay} alt="Overlay" class="layer" />

	<div class="liikennevalo {valocolor}"></div>
</div>

<style>
	.liikennevalo {
		position: absolute;

		width: 58%; /* 👈 scale with container */
		aspect-ratio: 1; /* keeps it a perfect circle */

		top: 2%; /* 👈 adjust these visually */
		left: 50%;
		transform: translateX(-50%);

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
	img {
		width: 100%;
		height: 100%;
		object-fit: contain; /* or cover depending on your images */
	}
	.stack {
		--size: 100px; /* 👈 change this and everything scales */

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
