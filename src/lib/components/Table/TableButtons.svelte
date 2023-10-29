<script lang="ts">
	import { document, checked } from '$lib/stores/documents';
	import { db } from '$lib/database/database';
	import { exportCSV, exportJSONL } from '$lib/utils/export';
	import { Trash, ChevronDown, Download, Code } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import Dialog from '../Dialog/Dialog.svelte';
	import Button from '../Button.svelte';
	import { linear } from 'svelte/easing';
	export let tabOpen: boolean;
	export let allChecked: boolean;
	let menuOpen = false;
	async function deleteCheckedItems() {
		const updatedCompletions = $document.completions.filter((_, index) => {
			return !$checked[index];
		});
		db.table('documents').put({ ...$document, completions: updatedCompletions });
		$document = { ...$document, completions: updatedCompletions };
		allChecked = false;
		$checked = Array($document.completions.length).fill(false);
	}
</script>

<div
	class="flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 sm:flex hidden bg-popover"
>
	<div
		class="w-full flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
	>
		<div class="flex gap-2 justify-between w-full">
			<div class="flex gap-2">
				<Dialog testId="dialog" />
				<Button data-testId="delete" on:click={deleteCheckedItems}>
					<Trash class="h-5 w-5" />
				</Button>
				<Button
					data-testId="export-csv"
					variant="default"
					className="gap-2"
					on:click={() => exportCSV($document.completions)}
				>
					<Download class="h-5 w-5" /> CSV
				</Button>
				<Button
					data-testId="export-jsonl"
					variant="default"
					className="gap-2"
					on:click={() => exportJSONL($document.completions)}
				>
					<Download class="h-5 w-5" /> JSON
				</Button>
			</div>
			<Button variant="default" className="gap-2" on:click={() => (tabOpen = true)}>
				<Code class="h-5 w-5" />
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
		<div class="flex gap-2 w-full relative">
			<Dialog testId="mobile-dialog" />
			<Button on:click={deleteCheckedItems}>
				<Trash class="h-5 w-5" />
			</Button>
			<Button className="text-lg" on:click={() => (menuOpen = !menuOpen)}>
				Actions <ChevronDown class={`${menuOpen ? 'rotate-180' : 'rotate-0'} transition`} />
			</Button>
			{#if menuOpen}
				<div
					class="absolute top-12 h-fit w-full bg-background rounded-lg p-2 gap-2 flex flex-col"
					transition:slide={{
						axis: 'y',
						duration: 200,
						easing: linear
					}}
				>
					<Button
						variant="default"
						className="gap-2"
						on:click={() => exportCSV($document.completions)}
					>
						<Download class="h-5 w-5" /> CSV
					</Button>
					<Button
						variant="default"
						className="gap-2"
						on:click={() => exportJSONL($document.completions)}
					>
						<Download class="h-5 w-5" /> JSON
					</Button>
					<Button variant="default" className="gap-2" on:click={() => (tabOpen = true)}>
						<Code class="h-5 w-5" /> Code
					</Button>
				</div>
			{/if}
		</div>
	</div>
</div>
