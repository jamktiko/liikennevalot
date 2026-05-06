<script lang="ts">
	let audio: HTMLAudioElement;

	function playSound() {
		if (!audio) return;

		audio.currentTime = 0;
		audio.play();
	}
</script>

<audio bind:this={audio} src="/sounds/tone.mp3"></audio>

<button onclick={playSound}> Toista ääni </button>
