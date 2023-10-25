<script lang="ts">
	export let checked: boolean;
	import { X } from 'lucide-svelte';
	export let testId: string;
	function toggleCheckbox() {
		checked = !checked;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			toggleCheckbox();
		}
	}
</script>

<button
	data-testId={testId}
	class="w-5 h-5 bg-card focus:outline-none focus:ring flex items-center justify-center rounded border border-gray-400/50 {checked
		? 'bg-background'
		: ''}"
	on:click={toggleCheckbox}
	on:keydown={handleKeyDown}
	aria-label="custom checkbox"
	role="checkbox"
	aria-checked={checked}
>
	{#if checked}
		<X />
	{/if}
</button>

<input
	type="checkbox"
	class="opacity-0 absolute pointer-events-none"
	bind:checked
	id="myCheckbox"
/>
