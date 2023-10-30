<script lang="ts">
	import { checked, document, documents, getStore, getDocuments } from '$lib/stores/documents';
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import json from 'svelte-highlight/languages/json';
	import base16IrBlack from 'svelte-highlight/styles/base16-ir-black';
	import { Eye, X, Table as TableIcon } from 'lucide-svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import TableButtons from '$lib/components/Table/TableButtons.svelte';
	import { serializeCompletionArray } from '$lib/utils/export';
	import { onMount } from 'svelte';
	import TableFooter from '$lib/components/Table/TableFooter.svelte';
	import Button from '$lib/components/Button.svelte';
	import { page } from '$app/stores';
	let code = '';
	let tabOpen = false;
	let allChecked = false;
	let prettify = false;
	$: code = serializeCompletionArray($document.completions, prettify);
	$: {
		if (allChecked) {
			$checked = Array($document.completions.length).fill(true);
		} else {
			allChecked = false;
		}
	}

	onMount(async () => {
		await getDocuments();
		page.subscribe(async ($page) => {
			if ($documents) {
				await getStore($page.params.id);
			}
		});
	});
</script>

<svelte:head>
	{@html base16IrBlack}
</svelte:head>

<div class="h-full flex items-start justify-center gap-2">
	<div class="max-w-7xl w-screen h-full relative items-start flex flex-col gap-2">
		{#if tabOpen}
			<div class="flex h-full flex-col w-full gap-2 p-0 border border-ring/25">
				<div class="flex w-full justify-end items-end gap-2 p-4 pb-2">
					<Button className="gap-2" on:click={() => (prettify = !prettify)}>
						{#if prettify}
							<X class="h-5 w-5" />
						{:else}
							<Eye class="h-5 w-5" />
						{/if}
						Pretty
					</Button>
					<Button on:click={() => (tabOpen = false)}>
						<TableIcon class="h-5 w-5" />
					</Button>
				</div>
				<div class="overflow-scroll h-screen w-full relative">
					<Highlight language={json} {code} let:highlighted>
						<div class="w-screen bg-secondary p-2.5">
							<span>JSON</span>
							<CopyButton />
						</div>
						<LineNumbers {highlighted} hideBorder />
					</Highlight>
				</div>
			</div>
		{:else}
			<section class="antialiased w-full sm:p-0 h-full border border-ring/25 overflow-hidden">
				<div class="relative shadow-md">
					<TableButtons {allChecked} bind:tabOpen />
				</div>
				<Table bind:allChecked />
				<TableFooter />
			</section>
		{/if}
	</div>
</div>
