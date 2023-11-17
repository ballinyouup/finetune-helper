<script lang="ts">
	import Button from '../Button.svelte';
	import DialogOverlay from './DialogOverlay.svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { flyAndScale } from '$lib/utils/flyAndScale';
	import DialogButton from './DialogButton.svelte';
	import { X } from 'lucide-svelte';
	export let triggerTooltip: string;
	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});
</script>

<Button aria-label={triggerTooltip} action={trigger} tooltip={triggerTooltip}>
	<slot name="trigger" />
</Button>
<!-- <Button data-testId={testId + '-trigger'} action={trigger}>
	<Plus strokeWidth={2} />
</Button> -->
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
			aria-label="dialog-content"
		>
			<h2 use:melt={$title} class="m-0 text-lg font-medium text-white">
				<slot name="title" />
			</h2>
			<p use:melt={$description} class="mb-5 mt-2 leading-normal text-muted-foreground">
				<slot name="description" />
			</p>
			<slot name="content" {close} />
			<DialogButton
				{close}
				ariaLabel="close"
				className="absolute right-4 top-4 inline-flex
			items-center justify-center rounded-full p-1 text-primary-foreground
			hover:bg-secondary focus:bg-background transition"
			>
				<X class="square-4 text-white" />
			</DialogButton>
			<slot name="footer" {close} />
		</div>
	{/if}
</div>
