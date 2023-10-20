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
				{#if completions.length > 0 && isGPT(completions[completions.length - 1])}
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
						<td class="max-w-sm box-content">
							<div class="px-4 py-3 w-full overflow-scroll">{row.messages[0].content}</div>
						</td>
						<td class=" max-w-sm box-content">
							<div class="px-4 py-3 w-full overflow-scroll">{row.messages[1].content}</div>
						</td>
						<td class=" max-w-sm box-content overflow-hidden pr-2">
							<div class="px-4 py-3 w-full overflow-scroll">{row.messages[2].content}</div>
						</td>
					{:else}
						<td class=" max-w-sm box-content">
							<div class="px-4 py-3 w-full overflow-scroll">{row.prompt}</div>
						</td>
						<td class=" max-w-sm box-content">
							<div class="px-4 py-3 w-full overflow-hidden pr-2">{row.completion}</div>
						</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
