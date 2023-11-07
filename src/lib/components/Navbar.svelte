<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import Sheet from './Sheet.svelte';
	import { Image } from '@unpic/svelte';
	let sheetOpen = false;
</script>

<nav class="flex h-fit w-full max-w-7xl justify-between self-start p-4 text-2xl font-bold">
	<div class="flex items-center gap-4">
		<Image src="/logo.png" alt="FineTune Helper Logo" width="40" height="36" />
		<a href="/">FineTune Helper</a>
	</div>
	<div class="flex md:hidden">
		<button on:click={() => (sheetOpen = true)}>
			<Menu />
		</button>
	</div>
</nav>
{#if sheetOpen}
	<Sheet bind:sheetOpen />
{/if}
