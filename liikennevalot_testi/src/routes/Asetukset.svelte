<script lang="ts">
	// Otetaan vastaan sulje-funktio propseina

	interface Props {
		juomapeli: boolean;
		sulje: () => void;
	}

	let { juomapeli = $bindable(), sulje }: Props = $props();

	// Asetusten tilanhallinta
	let musiikki = $state(true);
	let aanet = $state(true);
</script>

<!-- Koko ruudun peittävä tausta -->
<div
	class="fixed inset-0 z-[100] flex items-center justify-center p-4 font-['Press_Start_2P'] select-none"
>
	<div class="relative w-full max-w-xs sm:max-w-sm">
		<!-- Asetuslaatikko -->
		<div
			class="border-[4px] border-black bg-sky-200 p-7 shadow-[8px_8px_0px_0px_rgba(0,0,0,1),inset_0_-8px_0_rgba(0,0,0,0.5)]"
		>
			<h2 class="mb-8 text-center text-lg font-bold tracking-widest text-black uppercase">
				Asetukset
			</h2>

			<div class="space-y-4">
				<!-- Juomapeli-valinta -->
				<label
					class="flex cursor-pointer items-center justify-between border-2 border-black bg-white p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-y-0.5"
				>
					<span class="text-[10px] font-black tracking-tighter text-black uppercase">Juomapeli</span
					>
					<input
						type="checkbox"
						bind:checked={juomapeli}
						class="h-6 w-6 cursor-pointer border-2 border-black accent-green-500"
					/>
				</label>

				<!-- Musiikki-valinta -->
				<label
					class="flex cursor-pointer items-center justify-between border-2 border-black bg-white p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-y-0.5"
				>
					<span class="text-[10px] font-black tracking-tighter text-black uppercase">Musiikki</span>
					<input
						type="checkbox"
						bind:checked={musiikki}
						class="h-6 w-6 cursor-pointer border-2 border-black accent-green-500"
					/>
				</label>

				<!-- Äänet-valinta -->
				<label
					class="flex cursor-pointer items-center justify-between border-2 border-black bg-white p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-y-0.5"
				>
					<span class="text-[10px] font-black tracking-tighter text-black uppercase"
						>Pelin äänet</span
					>
					<input
						type="checkbox"
						bind:checked={aanet}
						class="h-6 w-6 cursor-pointer border-2 border-black accent-green-500"
					/>
				</label>
			</div>

			<!-- Sulje-nappi -->
			<div class="mt-12 flex justify-center">
				<button
					onclick={sulje}
					class="border-4 border-black bg-white px-8 py-3 text-sm font-black text-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-gray-100 active:translate-y-1 active:shadow-none"
				>
					Sulje
				</button>
			</div>
		</div>
	</div>
</div>
