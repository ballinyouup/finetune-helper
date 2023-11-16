<script lang="ts">
	import { deleteDocument } from '$lib/stores/documents';
	import { Plus, Trash, X } from 'lucide-svelte';
	import Button from './Button.svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import DialogOverlay from './Dialog/DialogOverlay.svelte';
	import { flyAndScale } from '$lib/utils/flyAndScale';
	import DialogButton from './Dialog/DialogButton.svelte';
	export let docId: string;
	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});
</script>

<Button action={trigger} variant="destructive" class="h-fit p-2">
	<Trash strokeWidth="2" class="h-5 w-5" />
</Button>
<div use:melt={$portalled}>
	{#if $open}
		<DialogOverlay {overlay} />
		<div
			class="fixed left-[50%] top-[50%] z-50 flex max-h-[85vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] flex-col rounded-xl border border-ring/50 bg-card p-6 shadow-lg sm:max-w-[450px] [&>.dropzone]:!border hover:[&>.dropzone]:border-solid hover:[&>.dropzone]:brightness-50 hover:[&>.dropzone]:transition-all hover:[&>.dropzone]:!duration-300"
			transition:flyAndScale={{
				duration: 150,
				y: 8,
				start: 0.96
			}}
			use:melt={$content}
		>
			<h2 use:melt={$title} class="m-0 text-lg font-medium text-white">Delete Document</h2>
			<p use:melt={$description} class="mb-5 mt-2 leading-normal text-muted-foreground">
				Are you sure you want to delete this document?
			</p>
			<Button
				action={close}
				class="h-fit w-fit px-2"
				variant="destructive"
				aria-label="Delete"
				on:click={async () => await deleteDocument(docId)}
			>
				Delete
			</Button>
			<DialogButton
				data-testId="dialog-close"
				{close}
				ariaLabel="close"
				className="absolute right-4 top-4 inline-flex
		items-center justify-center rounded-full p-1 text-primary-foreground
		hover:bg-secondary focus:bg-background transition"
			>
				<X class="square-4 text-white" />
			</DialogButton>
		</div>
	{/if}
</div>
