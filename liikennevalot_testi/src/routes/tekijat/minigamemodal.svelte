<script lang="ts">
	let open = $state(false);
	import Button from '../Button.svelte';

	let left = $state(0);
	let top = $state(0);

	let intervalId: ReturnType<typeof setInterval> | null = null;

	function random() {
		return Math.floor(Math.random() * 100);
	}

	function miniGameStart() {
		// estetään useampi interval samaan aikaan
		if (intervalId) return;

		intervalId = setInterval(() => {
			left = random();
			top = random();
		}, 580);
	}

	function miniGameStop() {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}
</script>

<button
	onclick={() => {
		miniGameStart();
		open = true;
	}}>Start mini game</button
>

{#if open}
	<div class="overlay">
		<div
			class="modal"
			style="left: {left}%; top: {top}%; position: absolute; transform: translate(-50%, -50%);"
		>
			<h2>HELLO WORLD</h2>
			<p></p>

			<Button
				text="SULJE"
				onclick={() => {
					open = false;
					miniGameStop();
					left = random();
					top = random();
				}}
			/>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.modal {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		min-width: 300px;

		position: absolute;
	}
</style>
