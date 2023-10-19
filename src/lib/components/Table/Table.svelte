<script lang="ts">
	import { isGPT, type Completion } from '$lib/stores/output';
	import Checkbox from '../Checkbox.svelte';
	export let checked: boolean[];
	export let allChecked: boolean;
	export let completions: Completion[] = [];
</script>

<div class="overflow-x-auto">
	<table class="w-full text-sm text-left text-gray-400">
		<thead class="text-xs uppercase bg-gray-700 text-gray-400">
			<tr>
				{#if completions.length > 0 && isGPT(completions[completions.length-1])}
					<th scope="col" class="px-4 py-3"><Checkbox bind:checked={allChecked} /></th>
					<th scope="col" class="px-4 py-4">System</th>
					<th scope="col" class="px-4 py-3">User</th>
					<th scope="col" class="px-4 py-3">Assistant</th>
				{:else}
					<th scope="col" class="px-4 py-3"><Checkbox bind:checked={allChecked} /></th>
					<th scope="col" class="px-4 py-3">Prompt</th>
					<th scope="col" class="px-4 py-3">Completion</th>
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each completions as row, index}
				<tr class="border-b border-gray-700">
					<th scope="col" class="px-4 py-3"><Checkbox bind:checked={checked[index]} /></th>
					{#if isGPT(row)}
						<th scope="row" class="px-4 py-3 font-medium whitespace-nowrap text-white"
							>{row.messages[0].content}</th
						>
						<td class="px-4 py-3">{row.messages[1].content}</td>
						<td class="px-4 py-3">{row.messages[2].content}</td>
					{:else}
						<td class="px-4 py-3">{row.prompt}</td>
						<td class="px-4 py-3">{row.completion}</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
