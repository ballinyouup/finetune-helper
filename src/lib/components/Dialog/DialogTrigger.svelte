<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import type { createDialog } from '@melt-ui/svelte';
	type DialogReturnType = ReturnType<typeof createDialog>;
	type TriggerType = DialogReturnType['elements']['trigger'];
	export let className: string = '';
	export let trigger: TriggerType;
</script>

<button use:melt={$trigger} class={className}>
	<slot />
</button>
