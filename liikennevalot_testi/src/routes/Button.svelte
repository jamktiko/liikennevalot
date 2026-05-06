<script lang="ts">
	import { withClickSound } from '$lib/components/sound';

	interface Props {
		text?: string;
		onclick?: () => void;
		disabled?: boolean;
	}

	let { text, onclick, disabled = false }: Props = $props();

	function handleClick() {
		if (disabled) return;
		if (!onclick) return;

		withClickSound(onclick)();
	}
</script>

<button
	onclick={handleClick}
	{disabled}
	class="border-4 border-black bg-white p-4 font-['Press_Start_2P'] text-xs shadow-[inset_0px_-6px_0px_rgba(0,0,0,0.4)] transition-transform [text-shadow:2px_2px_0px_rgba(0,0,0,0.3)] hover:scale-110"
>
	{text}
</button>
