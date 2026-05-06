<script lang="ts">
	import type Player from '$lib/components/Pelaaja.d.ts';
	import Button from './Button.svelte';
	import Character from './Character.svelte';

	let { players, sulje } = $props<{
		players: Player[];
		sulje: () => void;
	}>();

	// Järjestetään pelaajat niin, että eniten voittoja saanut on ekana
	let jarjestetytPelaajat = $derived([...players].sort((a, b) => b.wins - a.wins));
</script>

<div
	class="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 font-['Press_Start_2P'] backdrop-blur-sm select-none"
>
	<div
		class="pixel-shadow flex w-[450px] flex-col items-center gap-6 border-[6px] border-black bg-[#9dc2e0] p-6"
	>
		<h2 class="text-2xl text-black uppercase [text-shadow:3px_3px_0px_rgba(0,0,0,0.2)]">
			Tulokset
		</h2>

		<div class="w-full space-y-4">
			{#each jarjestetytPelaajat as p (p.key)}
				<div
					class="flex items-center justify-between border-4 border-black bg-white p-3 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
				>
					<div class="flex items-center gap-3">
						<div style="transform: scale(0.6);">
							<Character color={p.c} character={p.character} />
						</div>
						<span class="text-[10px] text-black uppercase">{p.name}</span>
					</div>
					<span class="text-xl font-bold text-black">{p.wins}</span>
				</div>
			{/each}
		</div>

		<Button text="SULJE" onclick={sulje} />
	</div>
</div>

<style>
	.pixel-shadow {
		box-shadow: 10px 10px 0px 0px rgba(0, 0, 0, 0.5);
	}
</style>
