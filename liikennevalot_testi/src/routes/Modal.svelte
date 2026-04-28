<script lang="ts">
	import type { Snippet } from 'svelte';

	// Määritellään propsit: children on Snippet, header ja footer ovat valinnaisia Snippetejä
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

<div class="backdrop"></div>

<div class="modal">
	<header>
		{#if header}
			{@render header()}
		{/if}
	</header>

	<main>
		{@render children()}
	</main>

	<footer>
		{#if footer}
			{@render footer()}
		{/if}
	</footer>
</div>

<style>
	/* Lisää tähän antamasi CSS-tyylit */
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.75);
		z-index: 10;
	}

	.modal {
		padding: 1rem;
		position: fixed;
		top: 10vh;
		left: 10vw;
		width: 80%;
		max-height: 80vh;
		background: white;
		border-radius: 5px;
		z-index: 100;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	}
</style>
