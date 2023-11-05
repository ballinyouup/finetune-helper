<script lang="ts">
	import Button from './Button.svelte';
	import DialogOverlay from './Dialog/DialogOverlay.svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { Download, X } from 'lucide-svelte';
	import { flyAndScale } from '$lib/utils/flyAndScale';
	import DialogButton from './Dialog/DialogButton.svelte';
	import { exportCSV, exportJSONL } from '$lib/utils/export';
	import { document } from '$lib/stores/documents';
	import ModeToggle from './ModeToggle.svelte';

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});
</script>

<Button aria-label="export" action={trigger}>
	<Download strokeWidth={2} />
</Button>
<div use:melt={$portalled}>
	{#if $open}
		<DialogOverlay {overlay} />
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-xl border border-ring/50 bg-card p-6 shadow-lg sm:max-w-[450px]"
			transition:flyAndScale={{
				duration: 150,
				y: 8,
				start: 0.96
			}}
			use:melt={$content}
		>
			<h2 use:melt={$title} class="m-0 text-lg font-medium text-white">Export</h2>
			<p use:melt={$description} class="mb-5 mt-2 leading-normal text-muted-foreground">
				Choose your export format.
			</p>
			<div class="flex flex-col gap-2">
				<ModeToggle />
				<Button
					aria-label="export-jsonl"
					action={close}
					on:click={() => exportJSONL($document.completions)}
				>
					JSONL
				</Button>
				<Button
					aria-label="export-csv"
					action={close}
					on:click={() => exportCSV($document.completions)}
				>
					CSV
				</Button>
			</div>
		</div>
	{/if}
</div>
