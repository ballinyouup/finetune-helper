<script lang="ts">
	import type { createDialog } from '@melt-ui/svelte';
	import Button from '../Button.svelte';
	export let className: string = '';
	export let trigger: ReturnType<typeof createDialog>['elements']['trigger'];
	export let testId: string;
</script>

<Button data-testId={testId} action={trigger} {className}>
	<slot />
</Button>
