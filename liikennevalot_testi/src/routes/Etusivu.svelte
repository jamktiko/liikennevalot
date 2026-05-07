<script lang="ts">
	import { withClickSound } from '$lib/components/sound';

	// Otetaan vastaan propsit pääohjelmasta
	let { aloita, lisaaPelaaja, poistaPelaaja, pelaajamaara } = $props<{
		aloita: () => void;
		lisaaPelaaja: () => void;
		poistaPelaaja: () => void;
		pelaajamaara: number;
	}>();
</script>

<div
	class="fixed inset-0 z-60 flex items-center justify-center bg-black/70 font-['Press_Start_2P'] select-none"
>
	<div class="flex min-h-screen items-center justify-center">
		<div
			class="flex aspect-square w-125 flex-col items-center justify-between border-[6px] border-black bg-[#9dc2e0] p-8 font-mono shadow-[10px_10px_0px_0px_rgba(0,0,0,0.2)]"
		>
			<div class="text-center">
				<h2
					class="mb-4 font-['Press_Start_2P'] text-3xl font-black tracking-tighter text-black uppercase [text-shadow:4px_4px_0px_rgba(0,0,0,0.3)]"
				>
					Ohjeet
				</h2>
				<p
					class="max-w-100 font-['Press_Start_2P'] text-[12px] leading-tight font-black text-black uppercase [text-shadow:2px_2px_0px_rgba(0,0,0,0.3)]"
				>
					Valon ollessa vihreä, paina nappia. Liian aikaisesta reaktiosta rangaistaan. Ensimmäinen
					maalissa voittaa.
				</p>
			</div>

			<div class="flex flex-col items-center">
				<h3
					class="mb-4 font-['Press_Start_2P'] text-xl font-black text-black uppercase [text-shadow:3px_3px_0px_rgba(0,0,0,0.3)]"
				>
					Pelaajat
				</h3>

				<div
					class="flex items-center gap-4 border-4 border-black bg-white p-4 shadow-[6px_6px_0px_rgba(0,0,0,0.3)]"
				>
					<button
						onclick={withClickSound(poistaPelaaja)}
						disabled={pelaajamaara <= 2}
						class="flex h-16 w-16 items-center justify-center border-4 border-black bg-[#eb4c34] text-4xl font-bold text-white shadow-[inset_0px_-6px_0px_rgba(0,0,0,0.4)] active:translate-y-1 disabled:opacity-50 disabled:grayscale disabled:active:translate-y-0"
					>
						-
					</button>

					<div
						class="flex h-20 w-20 items-center justify-center border-4 border-black bg-[#c0c0c0] text-4xl font-black text-black shadow-[inset_0px_-4px_0px_rgba(0,0,0,0.4)]"
					>
						{pelaajamaara}
					</div>

					<button
						onclick={withClickSound(lisaaPelaaja)}
						disabled={pelaajamaara >= 4}
						class="flex h-16 w-16 items-center justify-center border-4 border-black bg-[#63a352] text-4xl font-bold text-white shadow-[inset_0px_-6px_0px_rgba(0,0,0,0.4)] active:translate-y-1 disabled:opacity-50 disabled:grayscale disabled:active:translate-y-0"
					>
						+
					</button>
				</div>
			</div>

			<button
				onclick={withClickSound(aloita)}
				class="p-7 text-center font-['Press_Start_2P'] text-3xl leading-none font-black text-black uppercase transition-transform [text-shadow:5px_5px_0px_rgba(0,0,0,0.3)] hover:scale-105"
			>
				Aloita<br />peli
			</button>
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
</style>
