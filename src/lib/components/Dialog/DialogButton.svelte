<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';
	export let close: ReturnType<typeof createDialog>['elements']['close'];
	export let className: string = '';
	export let ariaLabel: string = '';
	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click');
	}
</script>

<button
	{...$$restProps}
	aria-label={ariaLabel}
	class={className}
	use:melt={$close}
	on:click={handleClick}
>
	<slot />
</button>
