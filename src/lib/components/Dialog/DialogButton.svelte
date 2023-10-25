<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	export let close: ReturnType<typeof createDialog>['elements']['close'];
	export let className: string = '';
	export let ariaLabel: string = '';
	type $$Props = HTMLButtonAttributes & {
		className?: string;
		ariaLabel?: string;
		close: ReturnType<typeof createDialog>['elements']['close'];
	};
</script>

<button {...$$restProps} aria-label={ariaLabel} class={className} use:melt={$close} on:click>
	<slot />
</button>
