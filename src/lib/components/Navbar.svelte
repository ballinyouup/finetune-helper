<script lang="ts">
	let sheetOpen = false;
	import { Menu } from 'lucide-svelte';
	import Sheet from './Sheet.svelte';
</script>

<nav class="flex h-fit w-full max-w-7xl justify-between self-start p-4 text-2xl font-bold">
	<a href="/">FineTune Helper</a>
	<!-- <div class="flex w-fit gap-4">
		<a href="/about">About</a>
		<a href="/blog">Blog</a>
	</div> -->
	<div class="flex md:hidden">
		<button on:click={() => (sheetOpen = true)}>
			<Menu />
		</button>
	</div>
</nav>

<Sheet bind:sheetOpen />
