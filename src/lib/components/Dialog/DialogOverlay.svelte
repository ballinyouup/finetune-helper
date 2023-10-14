<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import { cn } from '$lib/utils/cn';
	import type { createDialog } from '@melt-ui/svelte';
	export let className: string = '';
	export let overlay: ReturnType<typeof createDialog>['elements']['overlay'];
</script>

<div use:melt={$overlay} class={cn('fixed inset-0 z-50 bg-black/80 transition', className)} />
