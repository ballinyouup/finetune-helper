<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	export let close: ReturnType<typeof createDialog>['elements']['close'];
	export let className: string = '';
	export let ariaLabel: string = '';

</script>

<button
	{...$$restProps}
	aria-label={ariaLabel}
	class={className}
	use:melt={$close}
	on:click
>
	<slot />
</button>
