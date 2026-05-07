<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let scale = $state(1);
</script>

<div class="wrapper">
	<div class="game" style="transform: translate(-50%, -50%) scale({scale});">
		<div class="flex min-h-screen items-center justify-center">
			<div
				class="flex aspect-square w-3xl flex-col items-center justify-between border-[6px] border-black bg-[#9dc2e0] p-8 font-mono shadow-[10px_10px_0px_0px_rgba(0,0,0,0.2)]"
			>
				<div class="bg-taustaväri/90 relative h-180 w-193 overflow-hidden">
					<!-- Otsikko -->
					<div
						class="absolute top-10 left-53 font-['Press_Start_2P'] text-6xl font-bold text-black [text-shadow:5px_9px_0px_rgb(0_0_0_/0.25)]"
					>
						Credits
					</div>

					<!-- Takaisin-nappi (Credits-osiossa) -->
					<div class="absolute top-10 left-10">
						<button
							onclick={() => goto(resolve('/'))}
							class="flex h-14 w-14 items-center justify-center border-4 border-black bg-[#d1d5db] font-['Press_Start_2P'] text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.25),inset_0_-6px_0_rgba(0,0,0,0.5)] transition-all active:translate-y-1 active:shadow-none"
						>
							&lt;
						</button>
					</div>

					<!-- Tekstisisältö -->
					<div class="absolute top-46 left-18 h-115 w-158 justify-start">
						<span
							class="font-['Press_Start_2P'] text-4xl font-bold text-black [text-shadow:5px_5px_0px_rgb(0_0_0_/0.25)]"
						>
							Koodaus<br />
						</span>
						<span
							class="font-['Press_Start_2P'] text-3xl leading-15 font-bold text-black [text-shadow:5px_5px_0px_rgb(0_0_0_/0.25)]"
						>
							Oula Hämäläinen<br />
						</span>
						<span
							class="font-['Press_Start_2P'] text-3xl font-bold text-black [text-shadow:5px_5px_0px_rgb(0_0_0_/0.25)]"
						>
							Juho Rajala<br /><br />
						</span>
						<span
							class="font-['Press_Start_2P'] text-4xl leading-15 font-bold text-black [text-shadow:5px_5px_0px_rgb(0_0_0_/0.25)]"
						>
							Käyttöliittymä<br />
						</span>
						<span
							class="font-['Press_Start_2P'] text-3xl leading-15 font-bold text-black [text-shadow:5px_5px_0px_rgb(0_0_0_/0.25)]"
						>
							Hilla korkiakoski<br />
						</span>
						<span
							class="font-['Press_Start_2P'] text-3xl font-bold text-black [text-shadow:5px_5px_0px_rgb(0_0_0_/0.25)]"
						>
							Elias Hakala<br />
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
