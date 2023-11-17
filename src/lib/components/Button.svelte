<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { melt, type createDialog, createTooltip } from '@melt-ui/svelte';
	import { cva } from 'class-variance-authority';
	import { createEventDispatcher } from 'svelte';
	export let variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' =
		'default';
	let className = '';
	export { className as class };
	type DialogElements = ReturnType<typeof createDialog>['elements'];
	export let action: DialogElements['trigger'] | DialogElements['close'] | undefined = undefined;
	export let size: 'default' | 'sm' | 'lg' | 'icon' = 'default';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { fade } from 'svelte/transition';
	type $$Props = HTMLButtonAttributes & {
		action?: DialogElements['trigger'] | DialogElements['close'] | undefined;
		size?: 'default' | 'sm' | 'lg' | 'icon';
		variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
		class?: string;
		tooltip?: string;
	};
	export let tooltip: string = '';
	const {
		elements: { trigger, content },
		states: { open }
	} = createTooltip({
		openDelay: 0,
		closeDelay: 0,
		group: true
	});
	const dispatch = createEventDispatcher();
	const buttonVariants = cva(
		'inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
		{
			variants: {
				variant: {
					default: 'bg-primary text-primary-foreground hover:bg-primary/90',
					destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
					outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
					secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
					ghost: 'hover:bg-accent hover:text-accent-foreground',
					link: 'text-primary underline-offset-4 hover:underline'
				},
				size: {
					default: 'h-10 px-4 py-2',
					sm: 'h-9 rounded-md px-3',
					lg: 'h-11 rounded-md px-8',
					icon: 'h-10 w-10'
				}
			},
			defaultVariants: {
				variant: 'default',
				size: 'default'
			}
		}
	);
</script>

{#if $action}
	<button
		{...$$restProps}
		use:melt={$action}
		use:melt={$trigger}
		on:mouseleave={() => ($open = false)}
		on:pointerleave={() => ($open = false)}
		on:click={() => {
			dispatch('click');
		}}
		class={cn(buttonVariants({ variant, size, className }), 'relative')}
	>
		{#if $open && tooltip !== ''}
			<div
				use:melt={$content}
				transition:fade={{ duration: 100 }}
				class="absolute -bottom-10 !z-20 h-fit rounded-lg bg-white shadow"
			>
				<p class="px-4 py-1 text-black">
					{tooltip}
				</p>
			</div>
		{/if}
		<slot />
	</button>
{:else}
	<button
		{...$$restProps}
		use:melt={$trigger}
		on:mouseleave={() => ($open = false)}
		on:pointerleave={() => ($open = false)}
		on:click={() => {
			dispatch('click');
		}}
		class={cn(buttonVariants({ variant, size, className }), 'relative')}
	>
		{#if $open && tooltip !== ''}
			<div
				use:melt={$content}
				transition:fade={{ duration: 100 }}
				class="absolute -bottom-10 !z-20 h-fit rounded-lg bg-white shadow"
			>
				<p class="px-4 py-1 text-black">
					{tooltip}
				</p>
			</div>
		{/if}
		<slot />
	</button>
{/if}
