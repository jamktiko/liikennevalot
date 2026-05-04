<script lang="ts">
	import { onDestroy } from 'svelte';
	import { playSound } from '$lib/components/sound';

	let { nimet, suljeModal }: Props = $props();

	let current = $derived(nimet[0]);
	let shuffling = $state(false);

	let index = 0;
	let interval: ReturnType<typeof setInterval>;
	let timeout: ReturnType<typeof setTimeout>;

	interface Props {
		nimet: string[];
		suljeModal: () => void;
	}

	function startRaffle() {
		if (shuffling) return;

		shuffling = true;
		index = 0;

		// -----------------------------
		// TIMING CONFIG (easy to tweak)
		// -----------------------------

		const FAST_DURATION = 2000; // first phase duration (ms)
		const MEDIUM_DURATION = 2000; // second phase duration (ms)
		const SLOW_DURATION = 1000; // third phase duration (ms)

		const FINAL_MIN = 1000; // minimum final delay before stop (ms)
		const FINAL_MAX = 4000; // maximum final delay before stop (ms)

		const FAST_SPEED = 50; // interval speed (ms) → very fast
		const MEDIUM_SPEED = 100; // medium speed
		const SLOW_SPEED = 200; // slow speed

		// -----------------------------
		// Helper to start cycling
		// -----------------------------
		function startInterval(speed: number) {
			clearInterval(interval);
			interval = setInterval(() => {
				index = (index + 1) % nimet.length;
				current = nimet[index];
				playSound('hover');
			}, speed);
		}

		// -----------------------------
		// Phase 1: very fast
		// -----------------------------
		startInterval(FAST_SPEED);

		timeout = setTimeout(() => {
			// -----------------------------
			// Phase 2: medium speed
			// -----------------------------
			startInterval(MEDIUM_SPEED);

			timeout = setTimeout(() => {
				// -----------------------------
				// Phase 3: slow
				// -----------------------------
				startInterval(SLOW_SPEED);

				timeout = setTimeout(() => {
					// -----------------------------
					// Final phase: random stop time
					// -----------------------------
					const randomDelay = FINAL_MIN + Math.random() * (FINAL_MAX - FINAL_MIN);

					timeout = setTimeout(() => {
						clearInterval(interval);
						shuffling = false; // stops on current item
					}, randomDelay);
				}, SLOW_DURATION);
			}, MEDIUM_DURATION);
		}, FAST_DURATION);
	}

	onDestroy(() => {
		clearInterval(interval);
		clearTimeout(timeout);
	});

	startRaffle();
</script>

<div>
	<div class="raffle">
		{current} ottaa shotin!
	</div>
	{#if !shuffling}
		<button
			onclick={suljeModal}
			class="btn-shadow w-full border-4 border-black bg-white py-4 text-[10px] font-bold uppercase transition-all [text-shadow:2px_2px_0px_rgba(0,0,0,0.2)] hover:bg-gray-50 active:translate-y-1 active:bg-gray-100 md:text-[12px]"
		>
			Pelaa uudelleen
		</button>
	{/if}
</div>

<!-- <button onclick={startRaffle} disabled={shuffling}>
	{shuffling ? 'Shuffling...' : 'Start Raffle'}
</button> -->

<style>
	.raffle {
		width: 100%;
		height: 100px;

		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
