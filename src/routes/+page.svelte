<script lang="ts">
	import { output } from '$lib/stores/output';
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import json from 'svelte-highlight/languages/json';
	import base16IrBlack from 'svelte-highlight/styles/base16-ir-black';
	import { Eye, X } from 'lucide-svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import TableButtons from '$lib/components/Table/TableButtons.svelte';
	import { serializeCompletionArray } from '$lib/utils/export';
	let code = '';
	let tabOpen = false;
	let checked: boolean[] = [];
	let allChecked = false;
	let prettify = false;
	$: code = serializeCompletionArray($output, prettify)

	$: {
		if (allChecked) {
			checked = Array($output.length).fill(true);
		} else {
			allChecked = false;
		}
	}
	function deleteCheckedItems() {
		let newOutput = [];
		for (let index = 0; index < $output.length; index++) {
			if (!checked[index]) {
				newOutput.push($output[index]);
			}
		}
		output.set(newOutput);
		checked = Array(newOutput.length).fill(false);
	}
</script>

<svelte:head>
	{@html base16IrBlack}
</svelte:head>

<div class="h-full flex items-start justify-center gap-2">
	<div class="max-w-5xl w-full h-full relative items-start flex flex-col gap-2">
		{#if tabOpen}
			<div class="flex h-full flex-col w-full gap-2">
				<div class="flex w-full justify-end items-end gap-2">
					<button
						class="p-2 bg-primary rounded-lg text-base w-fit flex gap-1 items-center"
						on:click={() => (prettify = !prettify)}
					>
						{#if prettify}
							<X class="h-5 w-5" />
						{:else}
							<Eye class="h-5 w-5" />
						{/if}
						Pretty
					</button>
					<button
						class="p-2 bg-primary rounded-lg text-base w-fit flex gap-1 items-center"
						on:click={() => (tabOpen = false)}
					>
						<Eye class="h-5 w-5" /> Table
					</button>
				</div>
				<div class="rounded-lg overflow-scroll h-96 w-full relative">
					<Highlight language={json} {code} let:highlighted>
						<div class="w-full bg-primary p-2.5">
							<span>JSON</span>
							<CopyButton />
						</div>
						<LineNumbers {highlighted} hideBorder />
					</Highlight>
				</div>
			</div>
		{:else}
			<TableButtons {deleteCheckedItems} output={$output} bind:tabOpen />
			<Table output={$output} bind:allChecked {checked} />
		{/if}
	</div>
</div>
