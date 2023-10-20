<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	import Footer from '$lib/components/Footer/Footer.svelte';
</script>

<div class="w-full flex flex-col bg-background sm:h-full">
	<Navbar />
	<slot />
	<Footer />
</div>
