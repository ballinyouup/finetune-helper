<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import type { createDialog } from '@melt-ui/svelte';
	type DialogReturnType = ReturnType<typeof createDialog>;
	type TriggerType = DialogReturnType['elements']['trigger'];
	export let className: string = '';
	export let trigger: TriggerType;
	export let testId: string;
</script>

<button data-testId={testId} use:melt={$trigger} class={className}>
	<slot />
</button>
