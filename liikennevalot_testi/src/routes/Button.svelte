<script lang="ts">
	interface Props {
		text?: string;
		onclick?: () => void;
		disabled?: boolean;
	}

	let { text, onclick, disabled = false }: Props = $props();
</script>

<button
	{onclick}
	{disabled}
	class="border-4 border-black bg-yellow-400 p-4 font-['Press_Start_2P'] text-xs shadow-[6px_6px_0px_rgba(0,0,0,0.3)] transition-transform hover:scale-110"
>
	{text}
</button>
