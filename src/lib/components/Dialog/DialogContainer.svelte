<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
    export let className: string = '';
    export let portalled: ReturnType<typeof createDialog>['elements']['portalled'];
    export let open: ReturnType<typeof createDialog>['states']['open'];
	// export let overlay: ReturnType<typeof createDialog>['elements']['overlay'];
	// export let content: ReturnType<typeof createDialog>['elements']['content'];
	// export let close: ReturnType<typeof createDialog>['elements']['close'];
	// export let title: ReturnType<typeof createDialog>['elements']['title'];
	// export let description: ReturnType<typeof createDialog>['elements']['description'];
</script>

<div use:melt={$portalled} class={className}>
	{#if $open}
		<slot />
	{/if}
</div>
