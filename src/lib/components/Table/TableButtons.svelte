<script lang="ts">
	import type { Conversation } from '$lib/stores/output';
	import { exportCSV, exportJSON } from '$lib/utils/export';
	import { Trash, Eye } from 'lucide-svelte';
	export let output: Conversation[];
	import Dialog from '../Dialog/Dialog.svelte';
	import Button from '../Button.svelte';
	export let tabOpen: boolean;
	export let deleteCheckedItems: () => void;
</script>

<div class="flex gap-2 justify-between w-full">
	<div class="flex gap-2">
		<Dialog />
		<Button variant={'destructive'} on:click={deleteCheckedItems}>
			<Trash class="h-5 w-5" /> Delete
		</Button>
		<Button variant="default" on:click={() => exportCSV(output)}>Export CSV</Button>
		<Button variant="default" on:click={() => exportJSON(output)}>Export JSON</Button>
	</div>
	<Button variant="default" on:click={() => (tabOpen = true)}>
		<Eye class="h-5 w-5" /> Code
	</Button>
</div>
