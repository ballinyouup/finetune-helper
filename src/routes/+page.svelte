<script lang="ts">
	import { completions, checked } from '$lib/stores/output';
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import json from 'svelte-highlight/languages/json';
	import base16IrBlack from 'svelte-highlight/styles/base16-ir-black';
	import { Eye, X, Table as TableIcon } from 'lucide-svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import TableButtons from '$lib/components/Table/TableButtons.svelte';
	import { serializeCompletionArray } from '$lib/utils/export';
	import { onMount } from 'svelte';
	import { db } from '$lib/database/database';
	import TableFooter from '$lib/components/Table/TableFooter.svelte';
	import Button from '$lib/components/Button.svelte';
	let code = '';
	let tabOpen = false;

	let allChecked = false;
	let prettify = false;
	$: code = serializeCompletionArray($completions, prettify);

	$: {
		if (allChecked) {
			$checked = Array($completions.length).fill(true);
		} else {
			allChecked = false;
		}
	}
	async function deleteCheckedItems() {
		const deletePromises = $completions.map((completion, index) => {
			if ($checked[index]) {
				return db.table('completions').delete(completion.id);
			}
			return Promise.resolve();
		});

		await Promise.all(deletePromises);
		await getStore();
		allChecked = false;
		$checked = Array($completions.length).fill(false);
	}
	export async function getStore() {
		$completions = await db.table('completions').toArray();
	}

	onMount(async () => {
		await getStore();
	});
</script>

<svelte:head>
	{@html base16IrBlack}
</svelte:head>

<div class="h-full flex items-start justify-center gap-2">
	<div class="max-w-7xl w-full h-full relative items-start flex flex-col gap-2">
		{#if tabOpen}
			<div class="flex h-full flex-col w-full gap-2 px-5 sm:p-0 border border-ring/25">
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
						<div class="w-full bg-secondary p-2.5">
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
					<TableButtons {deleteCheckedItems} bind:tabOpen />
				</div>
				<Table bind:allChecked />
				<TableFooter />
			</section>
		{/if}
	</div>
</div>
