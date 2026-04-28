<script lang="ts">
	import character from '$lib/assets/favicon.svg';

	interface Props {
		text?: string;
		color: number;
	}
	let { color }: Props = $props();
</script>

<div class="visible" style="filter: sepia(1) saturate(1000%) hue-rotate({color}deg);">
	<img src={character} alt="Pixel art walking character" />
</div>

<style>
	.visible {
		filter: sepia(1) saturate(1000%) hue-rotate(0deg);
		color: rgb(24, 24, 24);
	}
	img {
		height: 80px;
	}
</style>
