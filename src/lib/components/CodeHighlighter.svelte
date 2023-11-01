<script lang="ts">
	import { X, Eye } from 'lucide-svelte';
	export let prettify = false;
	export let tabOpen = false;
	export let code = '';
	import Button from './Button.svelte';
	import { TableIcon } from 'lucide-svelte';
	import { Highlight, LineNumbers } from 'svelte-highlight';
	import { json } from 'svelte-highlight/languages';
	import CopyButton from './CopyButton.svelte';
	import ModeToggle from './ModeToggle.svelte';
</script>

<div class="flex h-full w-full flex-col gap-2 border border-ring/25 p-0">
	<div class="flex w-full items-end justify-end gap-2 p-4 pb-2">
		<Button className="gap-2" on:click={() => (prettify = !prettify)}>
			{#if prettify}
				<X class="h-5 w-5" />
			{:else}
				<Eye class="h-5 w-5" />
			{/if}
			Pretty
		</Button>
		<ModeToggle />
		<Button on:click={() => (tabOpen = false)} aria-label="view-table">
			<TableIcon class="h-5 w-5" />
		</Button>
	</div>
	<div class="relative h-screen w-full overflow-scroll">
		<Highlight language={json} {code} let:highlighted>
			<div class="w-screen bg-secondary p-2.5">
				<span>JSON</span>
				<CopyButton />
			</div>
			<LineNumbers {highlighted} hideBorder />
		</Highlight>
	</div>
</div>
