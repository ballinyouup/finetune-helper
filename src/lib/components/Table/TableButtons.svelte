<script lang="ts">
	import type { Completion } from '$lib/stores/output';
	import { exportCSV, exportJSONL } from '$lib/utils/export';
	import { Trash, Eye } from 'lucide-svelte';
	import Dialog from '../Dialog/Dialog.svelte';
	import Button from '../Button.svelte';
	export let tabOpen: boolean;
	export let completions: Completion[] = [];
	export let deleteCheckedItems: () => void;
</script>

<div class="flex gap-2 justify-between w-full">
	<div class="flex gap-2">
		<Dialog bind:completions/>
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
