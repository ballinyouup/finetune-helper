<script lang="ts">
	import Dialog from '$lib/components/Dialog/Dialog.svelte';
	import { output } from '$lib/stores/output';
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import json from 'svelte-highlight/languages/json';
	import base16IrBlack from 'svelte-highlight/styles/base16-ir-black';
	import copy from 'copy-text-to-clipboard';
	import { Copy, Check } from 'lucide-svelte';
	import { blur } from 'svelte/transition';
	import { downloadCsv, dataToCsv, downloadJSON } from '$lib/utils/export';
	let code = '';
	let copied = false;
	let initialCode = '{\n  messages: [\n    ' + '\n  ]\n}';
	$: code =
		'{\n  messages: [\n    ' +
		$output.map((item) => JSON.stringify(item)).join(',\n    ') +
		'\n  ]\n}';
	async function copyClick() {
		if (copied === false) {
			copied = !copied;
			copy(
				JSON.stringify({
					messages: $output
				})
			);
		} else {
			copied = !copied;
		}
	}
	function exportCSV() {
		downloadCsv(
			dataToCsv({
				messages: $output
			})
		);
	}
	function exportJSON() {
		downloadJSON({
			messages: $output
		});
	}
</script>

<svelte:head>
	{@html base16IrBlack}
</svelte:head>

<div class="h-full flex items-start justify-center gap-2">
	<div class="flex flex-col gap-2">
		<Dialog />
		<button class="p-2 bg-primary rounded-lg text-lg" on:click={exportCSV}>Export CSV</button>
		<button class="p-2 bg-primary rounded-lg text-lg" on:click={exportJSON}>Export JSON</button>
	</div>
	<div class="max-w-3xl w-full h-full relative">
		{#if code !== initialCode}
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
			<div class="rounded-lg overflow-hidden w-full">
				<Highlight language={json} {code} let:highlighted>
					<div class="w-full bg-primary p-2.5">JSON</div>
					<LineNumbers {highlighted} hideBorder />
				</Highlight>
			</div>
		{:else}
			<div class="w-full h-full bg-primary rounded-lg flex items-center justify-center">
				Enter a conversation
			</div>
		{/if}
	</div>
</div>
