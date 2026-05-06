<script lang="ts">
	import type Player from '$lib/components/Pelaaja.d.ts';

	let { players } = $props<{
		players?: Player[];
	}>();

	// Järjestetään pelaajat niin, että eniten voittoja saanut on ekana
	let jarjestetytPelaajat = $derived(players);

	let pelaajaMaara = $derived(players.length);
</script>

<div class="parent">
	<div class="contentbox" style="top: {50 + pelaajaMaara * 2.5}%;">
		<div
			class="fixed inset-0 z-[60] flex items-center justify-center font-['Press_Start_2P'] select-none"
		>
			<div class=" flex w-[600px] flex-col items-center gap-6 p-8">
				<div class="w-full space-y-4">
					{#each jarjestetytPelaajat.reverse() as p (p.key)}
						<div
							class="flex items-center justify-between border-4 border-black bg-yellow-400 p-3 text-xs shadow-[6px_6px_0px_rgba(0,0,0,0.3)]"
						>
							<div class="flex items-center gap-3">
								<div style="transform: scale(0.6);"></div>
								<span class="text-[12px] whitespace-nowrap text-black uppercase"
									>{p.name} : {p.key}</span
								>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.parent {
		height: 100%;
		margin: 0;
	}

	.contentbox {
		position: absolute;
		/* top: 61%; */
		left: 15%;
		transform: translate(-50%, -50%);
		opacity: 0.9;
	}
</style>
