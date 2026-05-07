<script lang="ts">
	import Button from './Button.svelte';
	import { playSound } from '$lib/components/sound';

	interface Props {
		juomapeli: boolean;
		musiikki: boolean;
		aanet: boolean;
		sulje: () => void;
	}

	let {
		juomapeli = $bindable(),
		musiikki = $bindable(),
		aanet = $bindable(),
		sulje
	}: Props = $props();
</script>

<div
	class="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 font-['Press_Start_2P'] backdrop-blur-sm select-none"
>
	<div class="relative w-full max-w-xs sm:max-w-sm">
		<div
			class="pixel-shadow flex w-full flex-col items-center gap-6 border-[6px] border-black bg-[#9dc2e0] p-6"
		>
			<h2 class="text-2xl text-black uppercase [text-shadow:3px_3px_0px_rgba(0,0,0,0.2)]">
				Asetukset
			</h2>

			<div class="w-full space-y-4">
				<label
					class="flex cursor-pointer items-center justify-between border-4 border-black bg-white p-3 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] active:translate-y-1"
				>
					<span class="text-[10px] font-black tracking-tighter text-black uppercase">
						Juomapeli
					</span>
					<input
						type="checkbox"
						bind:checked={juomapeli}
						class="h-6 w-6 cursor-pointer border-2 border-black accent-green-500"
						onchange={() => playSound('click')}
					/>
				</label>

				<label
					class="flex cursor-pointer items-center justify-between border-4 border-black bg-white p-3 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] active:translate-y-1"
				>
					<span class="text-[10px] font-black tracking-tighter text-black uppercase">
						Musiikki
					</span>
					<input
						type="checkbox"
						bind:checked={musiikki}
						class="h-6 w-6 cursor-pointer border-2 border-black accent-green-500"
						onchange={() => playSound('click')}
					/>
				</label>

				<label
					class="flex cursor-pointer items-center justify-between border-4 border-black bg-white p-3 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] active:translate-y-1"
				>
					<span class="text-[10px] font-black tracking-tighter text-black uppercase">
						Pelin äänet
					</span>
					<input
						type="checkbox"
						bind:checked={aanet}
						class="h-6 w-6 cursor-pointer border-2 border-black accent-green-500"
						onchange={() => playSound('click')}
					/>
				</label>
			</div>

			<Button text="SULJE" onclick={sulje} />
		</div>
	</div>
</div>

<style>
	.pixel-shadow {
		box-shadow: 10px 10px 0px 0px rgba(0, 0, 0, 0.5);
	}
</style>
