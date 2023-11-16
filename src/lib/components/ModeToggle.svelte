<script lang="ts">
	import { setFormat, document, format } from '$lib/stores/documents';
	import Button from './Button.svelte';
	import Icons from './Icons.svelte';
</script>

<div class="flex h-fit items-center">
	<Button
		on:click={() => setFormat('OpenAI', $document.id)}
		variant={`${$format === 'OpenAI' ? 'default' : 'outline'}`}
		class="rounded-none transition-none"
		aria-label="format-openai"
	>
		<Icons icon="openai" fill={`${$format === 'OpenAI' ? 'black' : 'white'}`} />
	</Button>
	<Button
		on:click={() => setFormat('Llama', $document.id)}
		variant={`${$format === 'Llama' ? 'default' : 'outline'}`}
		class="rounded-none transition-none"
		aria-label="format-llama"
	>
		<Icons icon="meta" fill={`${$format === 'Llama' ? 'black' : 'white'}`} />
	</Button>
</div>
