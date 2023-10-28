<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<div class="w-full flex flex-col bg-background">
	<Navbar />
	<div class="flex w-full justify-start">
		<Sidebar />
		<slot />
	</div>
	<Footer />
</div>
