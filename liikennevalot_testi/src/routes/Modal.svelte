<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		header,
		footer
	}: {
		children: Snippet;
		header?: Snippet;
		footer?: Snippet;
	} = $props();
</script>

<div class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"></div>

<div
	class="pixel-shadow fixed top-1/2 left-1/2 z-50 flex aspect-square w-[90%] max-w-125 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-start border-[6px] border-black bg-[#9dc2e0] p-8 text-center font-['Press_Start_2P'] md:p-12"
>
	<header class="mb-8 w-full leading-tight uppercase">
		{#if header}
			{@render header()}
		{/if}
	</header>

	<main class="mb-8 flex flex-col items-center justify-center">
		{@render children()}
	</main>

	<footer class="mt-auto w-full space-y-4">
		{#if footer}
			{@render footer()}
		{/if}
	</footer>
</div>

<style>
	:global(.btn-shadow) {
		box-shadow:
			4px 4px 0px 0px rgba(0, 0, 0, 0.25),
			inset 0 -6px 0 rgba(0, 0, 0, 0.3);
	}

	:global(.char-box-shadow) {
		box-shadow:
			4px 4px 0px 0px rgba(0, 0, 0, 0.25),
			inset 0 -8px 0 rgba(0, 0, 0, 0.3);
	}
	.pixel-shadow {
		box-shadow: 10px 10px 0px 0px rgba(0, 0, 0, 0.5);
	}
</style>
