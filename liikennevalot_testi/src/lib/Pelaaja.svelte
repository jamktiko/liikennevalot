<script lang="ts">
	import { PelaajaLuokka } from './pelaaja.svelte.ts';

	interface Props {
		kaikkiPelaajat: Pelaaja[];
	}

	export interface Pelaaja {
		key: string;
		x: number;
		name: string;
		dead: boolean;
		c: string[];
	}

	let { kaikkiPelaajat }: Props = $props();
</script>

<div style="background-color: {kaikkiPelaajat[0]?.c};"></div>
