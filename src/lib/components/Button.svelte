<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { melt, type createDialog } from '@melt-ui/svelte';
	import { buttonVariants } from '$lib';
	export let variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' =
		'default';
	export let className = '';
	type DialogElements = ReturnType<typeof createDialog>['elements'];
	export let action: DialogElements['trigger'] | DialogElements['close'] | undefined = undefined;
	export let size: 'default' | 'sm' | 'lg' | 'icon' = 'default';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	type $$Props = HTMLButtonAttributes & {
		action?: DialogElements['trigger'] | DialogElements['close'] | undefined;
		size?: 'default' | 'sm' | 'lg' | 'icon';
		variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
		className?: string;
	};
	
</script>

{#if $action}
	<button
		{...$$restProps}
		use:melt={$action}
		on:click
		class={cn(buttonVariants({ variant, size, className }))}
	>
		<slot />
	</button>
{:else}
	<button {...$$restProps} on:click class={cn(buttonVariants({ variant, size, className }))}>
		<slot />
	</button>
{/if}
