<script lang="ts">
	import { isGPT, completions, checked, isLlama } from '$lib/stores/output';
	import Checkbox from '../Checkbox.svelte';
	export let allChecked: boolean;
</script>

<div class="overflow-x-auto h-screen bg-background">
	<table class="w-full text-sm text-left">
		<thead class="text-xs uppercase bg-accent/50 text-white">
			<tr>
				{#if $completions.length > 0 && isGPT($completions[$completions.length - 1])}
					<th scope="col" class="px-4 py-3">
						<Checkbox testId="checked-all-gpt" bind:checked={allChecked} />
					</th>
					<th scope="col" class="px-4 py-4">System</th>
					<th scope="col" class="px-4 py-3">User</th>
					<th scope="col" class="px-4 py-3">Assistant</th>
				{:else if $completions.length > 0 && isLlama($completions[$completions.length - 1])}
					<th scope="col" class="px-4 py-3">
						<Checkbox testId="checked-all-llama" bind:checked={allChecked} />
					</th>
					<th scope="col" class="px-4 py-3">Prompt</th>
					<th scope="col" class="px-4 py-3">Completion</th>
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each $completions as row, index}
				<tr class="border-b border-ring/25 text-white bg-secondary w-full">
					<th scope="col" class="px-4 py-3 w-fit">
						<Checkbox testId={`checked-${index}`} bind:checked={$checked[index]} />
					</th>
					{#if isGPT(row)}
						<td class="box-content sm:min-w-[400px] max-w-[400px] overflow-hidden w-full">
							<div class="px-4 py-3 overflow-scroll">{row.messages[0].content}</div>
						</td>
						<td class=" box-content sm:min-w-[400px] max-w-[400px] overflow-hidden w-full">
							<div class="px-4 py-3 overflow-scroll">
								{row.messages[1].content}
							</div>
						</td>
						<td class="box-content sm:min-w-[400px] max-w-[400px] overflow-hidden pr-4 w-full">
							<div class="px-4 py-3 overflow-scroll w-full">
								{row.messages[2].content}
							</div>
						</td>
					{:else}
						<td class=" max-w-xs box-content">
							<div class="px-4 py-3 w-full overflow-scroll max-w-xs">{row.prompt}</div>
						</td>
						<td class=" max-w-xs box-content">
							<div class="px-4 py-3 w-full overflow-hidden pr-2 max-w-xs">{row.completion}</div>
						</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
