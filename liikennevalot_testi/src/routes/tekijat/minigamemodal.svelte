<script lang="ts">
	import Button from '../Button.svelte';

	type Modal = {
		id: number;
		left: number;
		top: number;
	};

	let modals = $state<Modal[]>([]);
	let intervalId: ReturnType<typeof setInterval> | null = null;
	let difficulty = $state(500);
	let speed = $derived(1500 - difficulty);

	let nextId = 1;

	function random() {
		return Math.floor(Math.random() * 100);
	}

	function spawnModal() {
		modals = [
			...modals,
			{
				id: nextId++,
				left: random(),
				top: random()
			}
		];
	}

	function miniGameStart() {
		if (intervalId) return;

		intervalId = setInterval(() => {
			spawnModal();
		}, speed);
	}

	function miniGameStop() {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
		modals = [];
	}

	function closeModal(id: number) {
		modals = modals.filter((m) => m.id !== id);

		if (modals.length === 0) {
			miniGameStop();
		}
	}
</script>

<button
	onclick={() => {
		miniGameStart();
	}}
>
	Start mini game
</button>

<label>
	Vaikeus:
	<input type="range" min="500" max="1000" step="10" bind:value={difficulty} />
</label>

{#if modals.length > 0}
	<div class="overlay">
		<div class="quitgame">
			<Button text="LOPETA" onclick={() => miniGameStop()} />
		</div>
	</div>
{/if}

{#each modals as modal (modal.id)}
	<div
		class="modal"
		style="left: {modal.left}%; top: {modal.top}%; transform: translate(-50%, -50%);"
	>
		<h2>HELLO WORLD</h2>
		<Button text="SULJE" onclick={() => closeModal(modal.id)} />
	</div>
{/each}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.2); /* optional tumma tausta */
		z-index: 999;
	}

	.modal {
		position: fixed;
		z-index: 1000;

		background: white;
		padding: 2rem;
		border: solid 4px black;
		border-radius: 12px;
		min-width: 300px;
	}
	.quitgame {
		position: absolute;
		top: -60px;
		right: -390px;
		margin: 10px;
		gap: 10px;
		display: flex;
	}
</style>
