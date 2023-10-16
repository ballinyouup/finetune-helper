<script lang="ts">
	import { blur } from 'svelte/transition';
	import copy from 'copy-text-to-clipboard';
	import { output } from '$lib/stores/output';
	import { Check, Copy } from 'lucide-svelte';
	import { serializeCompletionArray } from '$lib/utils/export';
	export let copied: boolean = false;
	async function copyClick() {
		if (copied === false) {
			copied = !copied;
			copy(serializeCompletionArray($output));
		} else {
			copied = !copied;
		}
	}
</script>

{#if copied}
	<button
		on:click={copyClick}
		transition:blur={{ duration: 200 }}
		class="absolute top-1 right-1 z-50 cursor-pointer border border-white/20 rounded-lg p-1"
	>
		<Check class="text-green-300" strokeWidth={4} />
	</button>
{:else}
	<button
		on:click={copyClick}
		transition:blur={{ duration: 200 }}
		class="absolute top-1 right-1 z-50 cursor-pointer border border-white/20 rounded-lg p-1"
	>
		<Copy strokeWidth={2} />
	</button>
{/if}
