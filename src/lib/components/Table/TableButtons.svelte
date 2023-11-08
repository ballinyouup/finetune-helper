<script lang="ts">
	import { document, checked } from '$lib/stores/documents';
	import { db } from '$lib/database/database';
	import { Trash, Code } from 'lucide-svelte';
	import Dialog from '../Dialog/Dialog.svelte';
	import Button from '../Button.svelte';
	import ModeToggle from '../ModeToggle.svelte';
	import ExportDialog from '../ExportDialog.svelte';
	export let tabOpen: boolean;
	export let allChecked: boolean;
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
	class="flex flex-col items-center justify-between space-y-3 bg-popover p-4 md:flex-row md:space-x-4 md:space-y-0"
>
	<div
		class="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:flex-row md:items-center md:space-x-3 md:space-y-0"
	>
		<div class="flex w-full justify-between gap-2">
			<div class="flex gap-2">
				<Dialog testId="dialog" />
				<Button data-testId="delete" on:click={deleteCheckedItems}>
					<Trash class="h-5 w-5" />
				</Button>
				<ExportDialog />
			</div>
			<div class="flex gap-2">
				<Button
					variant="default"
					class="gap-2"
					on:click={() => (tabOpen = true)}
					aria-label="view-code"
				>
					<Code class="h-5 w-5" />
				</Button>
			</div>
		</div>
	</div>
</div>
