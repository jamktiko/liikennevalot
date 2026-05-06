<script lang="ts">
	import type Player from '$lib/components/Pelaaja.d.ts';
	import Character from './Character.svelte';
	import { withClickSound } from '$lib/components/sound';

	let { players, pelaajamaara, vaihdaVari, pelaa, takaisin } = $props<{
		players: Player[];
		pelaajamaara: number;
		vaihdaVari: (index: number) => void;
		pelaa: () => void;
		takaisin: () => void;
	}>();
</script>

<div
	class="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 font-['Press_Start_2P'] select-none"
>
	<div
		class="pixel-shadow flex max-h-[500px] w-full max-w-5xl flex-col gap-6 overflow-y-auto border-[6px] border-black bg-[#9dc2e0] p-6 md:p-12"
	>
		<div class="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
			{#each players.slice(0, pelaajamaara) as player, i (player.key)}
				<div class="pixel-shadow flex gap-4 border-[4px] border-black bg-white p-4">
					<div
						class="relative flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden border-[4px] border-black bg-[#c0c0c0] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.25),_inset_0_-8px_0_rgba(0,0,0,0.3)] md:h-28 md:w-28"
					>
						<div style="transform: scale(1.5) translateY(10px);">
							<Character color={player.c} character={player.character} />
						</div>
					</div>

					<div class="flex w-full flex-col items-start justify-between overflow-hidden py-1">
						<div class="w-full space-y-2">
							<input
								type="text"
								bind:value={player.name}
								class="w-full border-b-2 border-dashed border-gray-400 bg-transparent text-[10px] font-bold uppercase outline-none focus:border-black md:text-[12px]"
								placeholder="Pelaaja {i + 1}"
							/>
							<p class="text-[8px] leading-relaxed text-gray-700 uppercase md:text-[9px]">
								Näppäin ({player.key.toUpperCase()})
							</p>
						</div>
						<div class="mt-2">
							<p class="mb-3 text-[8px] leading-none uppercase md:text-[9px]">Paidan väri:</p>
							<button
								onclick={() => vaihdaVari(i)}
								class="btn-shadow border-[3px] border-black bg-[#d1d5db] px-2 py-2 text-[7px] uppercase transition-all active:translate-y-1 active:shadow-none md:text-[8px]"
							>
								Vaihda väriä
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="flex w-full items-center justify-between">
			<button
				onclick={withClickSound(takaisin)}
				class="-mt-2 flex h-14 w-14 items-center justify-center border-[4px] border-black bg-[#d1d5db] text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.25),_inset_0_-6px_0_rgba(0,0,0,0.5)] transition-all active:translate-y-1 active:shadow-none"
			>
				&lt;
			</button>

			<button
				onclick={withClickSound(pelaa)}
				class="text-pixel-shadow -mt-0 cursor-pointer text-3xl font-bold tracking-tight text-black uppercase transition-transform hover:scale-105 active:scale-95 md:text-4xl"
			>
				PELAA
			</button>
			<div class="w-14"></div>
		</div>
	</div>
</div>

<style>
	.pixel-shadow {
		box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 0.5);
	}
	.btn-shadow {
		box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.25);
	}
	.text-pixel-shadow {
		text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.2);
	}
</style>
