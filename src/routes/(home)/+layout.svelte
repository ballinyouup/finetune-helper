<script lang="ts">
	import '../../app.css';
	let sheetOpen = false;
	// import { Menu } from 'lucide-svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import { Image } from '@unpic/svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<!-- Navbar -->
<nav class="flex h-fit w-full max-w-7xl justify-between self-start p-4 text-2xl font-bold">
	<div class="flex items-center gap-4">
		<Image src="/logo.png" alt="FineTune Helper Logo" width={40} height={36} />
		<a href="/">FineTune Helper</a>
	</div>
	<!-- <div class="flex md:hidden">
		<button on:click={() => (sheetOpen = true)}>
			<Menu />
		</button>
	</div> -->
</nav>

<slot />

<Footer />
