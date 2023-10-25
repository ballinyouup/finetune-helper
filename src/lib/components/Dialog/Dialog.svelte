<script lang="ts">
	export let testId: string;
	import Button from '../Button.svelte';
	import DialogOverlay from './DialogOverlay.svelte';
	import DialogContent from './DialogContent.svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { Plus } from 'lucide-svelte';

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});
</script>

<Button data-testId={testId + '-trigger'} action={trigger}>
	<Plus strokeWidth={2} />
</Button>
<div use:melt={$portalled}>
	{#if $open}
		<DialogOverlay {overlay} />
		<DialogContent testId={testId + '-content'} {content} {close} {title} {description} />
	{/if}
</div>
