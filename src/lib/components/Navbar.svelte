<script lang="ts">
	let sheetOpen = false;
	import { Menu } from 'lucide-svelte';
	import Sheet from './Sheet.svelte';
</script>

<nav class="w-full h-fit p-4 text-2xl font-bold flex justify-between max-w-7xl self-start">
	<a href="/">FineTune Helper</a>
	<!-- <div class="flex w-fit gap-4">
		<a href="/about">About</a>
		<a href="/blog">Blog</a>
	</div> -->
	<div class="sm:hidden flex">
		<button on:click={() => (sheetOpen = true)}>
			<Menu />
		</button>
	</div>
</nav>

<Sheet bind:sheetOpen />
