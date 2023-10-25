<script lang="ts">
	export let testId: string;
	import DialogTrigger from './DialogTrigger.svelte';
	import DialogContainer from './DialogContainer.svelte';
	import DialogOverlay from './DialogOverlay.svelte';
	import DialogContent from './DialogContent.svelte';
	import { createDialog } from '@melt-ui/svelte';
	import { Plus } from 'lucide-svelte';

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});
</script>

<DialogTrigger testId={testId + '-trigger'} {trigger}>
	<Plus strokeWidth={2} />
</DialogTrigger>
<DialogContainer {portalled} {open}>
	<DialogOverlay {overlay} />
	<DialogContent testId={testId + '-content'} {content} {close} {title} {description} />
</DialogContainer>
