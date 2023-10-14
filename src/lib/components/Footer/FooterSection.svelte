<script lang="ts">
	import { cn } from '$lib/utils/cn';
	export let title: string | undefined = undefined;
	export let className: string = '';
</script>

<div class="flex flex-col">
	{#if title}
		<div class="my-2 text-lg font-bold text-white">{title}</div>
	{/if}
	<div
		class={cn(
			'flex flex-col space-y-4 py-2 text-sm font-semibold text-muted-foreground',
			className
		)}
	>
		<slot />
	</div>
</div>
