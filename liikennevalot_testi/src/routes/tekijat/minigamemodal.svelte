<script lang="ts">
	import Button from '../Button.svelte';

	type Modal = {
		id: number;
		left: number;
		top: number;
	};

	let modals = $state<Modal[]>([]);
	let intervalId: ReturnType<typeof setInterval> | null = null;
	let speed = $state(550);
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
	Speed: {speed}ms
	<input type="range" min="500" max="1000" step="50" bind:value={speed} />
</label>

{#each modals as modal (modal.id)}
	<div
		class="modal"
		style="left: {modal.left}%; top: {modal.top}%; position: fixed; transform: translate(-50%, -50%);"
	>
		<h2>HELLO WORLD</h2>
		<Button text="SULJE" onclick={() => closeModal(modal.id)} />
	</div>
{/each}

<style>
	/* .overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0);
	} */

	.modal {
		background: white;
		padding: 2rem;
		border: solid 4px black;
		border-radius: 12px;
		min-width: 300px;
		position: absolute;
	}
</style>
