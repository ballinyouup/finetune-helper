<script lang="ts">
	import type { Completion } from '$lib/stores/output';
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import json from 'svelte-highlight/languages/json';
	import base16IrBlack from 'svelte-highlight/styles/base16-ir-black';
	import { Eye, X } from 'lucide-svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import TableButtons from '$lib/components/Table/TableButtons.svelte';
	import { serializeCompletionArray } from '$lib/utils/export';
	import { onMount } from 'svelte';
	import { db } from '$lib/database/database';
	import TableFooter from '$lib/components/Table/TableFooter.svelte';
	let code = '';
	let tabOpen = false;
	let checked: boolean[] = [];
	let allChecked = false;
	let prettify = false;
	let completions: Completion[] = [];
	$: code = serializeCompletionArray(completions, prettify);

	$: {
		if (allChecked) {
			checked = Array(completions.length).fill(true);
		} else {
			allChecked = false;
		}
	}
	async function deleteCheckedItems() {
		const deletePromises = completions.map((completion, index) => {
			if (checked[index]) {
				return db.table('completions').delete(completion.id);
			}
			return Promise.resolve();
		});

		await Promise.all(deletePromises);
		await getStore();
		allChecked = false;
		checked = Array(completions.length).fill(false);
	}
	export async function getStore() {
		completions = await db.table('completions').toArray();
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
			<div class="flex h-full flex-col w-full gap-2 px-5 sm:p-0">
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
							<CopyButton {completions} />
						</div>
						<LineNumbers {highlighted} hideBorder />
					</Highlight>
				</div>
			</div>
		{:else}
			<section class="antialiased w-full px-5 sm:p-0">
				<div>
					<div class="bg-gray-800 relative shadow-md rounded-t-lg">
						<TableButtons {deleteCheckedItems} bind:completions bind:tabOpen />
					</div>
				</div>
				<Table bind:completions bind:allChecked {checked} />
			</section>
		{/if}
	</div>
</div>
