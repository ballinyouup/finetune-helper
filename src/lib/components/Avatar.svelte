<script lang="ts">
	import { createAvatar, melt } from '@melt-ui/svelte';
	export let src: string;
	const {
		elements: { image, fallback }
	} = createAvatar({
		src: src
	});
</script>

<div class="flex w-full items-center justify-center gap-6">
	<div class="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
		<img use:melt={$image} alt="Avatar" class="h-full w-full rounded-[inherit]" />
		<span use:melt={$fallback} class="text-3xl font-medium text-primary-foreground">RH</span>
	</div>
</div>
