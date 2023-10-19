<script lang="ts">
	import type { Completion } from '$lib/stores/output';
	import { exportCSV, exportJSONL } from '$lib/utils/export';
	import { Trash, Eye } from 'lucide-svelte';
	import Dialog from '../Dialog/Dialog.svelte';
	import Button from '../Button.svelte';
	export let tabOpen: boolean;
	export let completions: Completion[] = [];
	export let deleteCheckedItems: () => void;
	let menuOpen = false;
</script>

<div
	class="flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 sm:flex hidden"
>
	<div
		class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
	>
		<div class="flex gap-2 justify-between w-full">
			<div class="flex gap-2">
				<Dialog bind:completions />
				<Button variant={'destructive'} on:click={deleteCheckedItems}>
					<Trash class="h-5 w-5" /> Delete
				</Button>
				<Button variant="default" on:click={() => exportCSV(completions)}>Export CSV</Button>
				<Button variant="default" on:click={() => exportJSONL(completions)}>Export JSON</Button>
			</div>
			<Button variant="default" on:click={() => (tabOpen = true)}>
				<Eye class="h-5 w-5" /> Code
			</Button>
		</div>
	</div>
</div>

<div
	class="flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 sm:hidden flex"
>
	<div
		class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
	>
		<div class="flex gap-2 justify-between w-full">
			<div class="flex gap-2">
				<Dialog bind:completions />
				<Button variant={'destructive'} on:click={deleteCheckedItems}>
					<Trash class="h-5 w-5" /> Delete
				</Button>
				<Button variant="default" on:click={() => exportCSV(completions)}>Export CSV</Button>
				<Button variant="default" on:click={() => exportJSONL(completions)}>Export JSON</Button>
			</div>
			<Button variant="default" on:click={() => (tabOpen = true)}>
				<Eye class="h-5 w-5" /> Code
			</Button>
		</div>
	</div>
</div>
