<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../../app.css';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="flex w-full flex-col bg-background">
	<Navbar />
	<div class="flex w-full justify-start">
		<Sidebar />
		<slot />
	</div>
	<Footer />
</div>
