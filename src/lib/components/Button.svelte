<script lang="ts">
	import { cn } from '$lib/utils/cn';
	export let variant: 'default' | 'destructive' = 'default';
	export let className = '';
	const styles = {
		default: 'p-2 bg-primary rounded-lg text-base flex gap-1 items-center',
		destructive: 'p-2 rounded-lg text-base flex gap-1 items-center bg-red-800'
	};

</script>

<button {...$$restProps} on:click class={cn(styles[variant], className)}>
	<slot />
</button>
