<script lang="ts">
	import type { Completion } from '$lib/stores/output';
	import Checkbox from '../Checkbox.svelte';
	export let checked: boolean[];
	export let allChecked: boolean;
	export let completions: Completion[] = [];
</script>

<div
	class="grid w-full max-w-5xl text-base text-left text-primary-foreground grid-cols-2 rounded-lg overflow-scroll bg-secondary h-96"
	style="grid-template-columns: repeat(13, minmax(0, 1fr)); grid-auto-rows: min-content;"
>
	<div class="px-4 py-3 uppercase bg-secondary col-span-1 flex items-center justify-start">
		<Checkbox bind:checked={allChecked} />
	</div>
	<div class="px-4 py-3 uppercase bg-secondary col-span-4">System</div>
	<div class="px-4 py-3 uppercase bg-secondary col-span-4">User</div>
	<div class="px-4 py-3 uppercase bg-secondary col-span-4">Assistant</div>
	{#if completions.length === 0}
		<div class="bg-primary h-96 w-full col-span-full" />
	{:else}
		{#each completions as row, index}
			<div class="px-4 py-4 bg-primary border-b border-muted overflow-scroll col-span-1">
				<Checkbox bind:checked={checked[index]} />
			</div>
			<div class="px-4 py-4 bg-primary border-b border-muted overflow-scroll col-span-4">
				{row.messages[0].content}
			</div>
			<div class="px-4 py-4 bg-primary border-b border-muted overflow-scroll col-span-4">
				{row.messages[1].content}
			</div>
			<div class="px-4 py-4 bg-primary border-b border-muted overflow-scroll col-span-4">
				{row.messages[2].content}
			</div>
		{/each}
	{/if}
</div>
