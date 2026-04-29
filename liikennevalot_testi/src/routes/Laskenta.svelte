<script lang="ts">
	interface Props {
		laskentaNro: number;
	}

	let { laskentaNro }: Props = $props();
</script>

{#if laskentaNro === 3}
	<h1>3 image</h1>
{:else if laskentaNro === 2}
	<h1>2 image</h1>
{:else if laskentaNro === 1}
	<h1>1 image</h1>
{:else if laskentaNro === 0}
	<h1>GO image</h1>
{/if}
