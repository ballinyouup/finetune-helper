<script lang="ts">
	import { checked, document, documents, getStore, getDocuments } from '$lib/stores/documents';
	import base16IrBlack from 'svelte-highlight/styles/base16-ir-black';
	import Table from '$lib/components/Table/Table.svelte';
	import TableButtons from '$lib/components/Table/TableButtons.svelte';
	import { serializeCompletionArray } from '$lib/utils/export';
	import { onMount } from 'svelte';
	import TableFooter from '$lib/components/Table/TableFooter.svelte';
	import { page } from '$app/stores';
	import CodeHighlighter from '$lib/components/CodeHighlighter.svelte';
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
		<CodeHighlighter bind:code bind:prettify bind:tabOpen />
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
