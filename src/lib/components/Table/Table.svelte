<script lang="ts">
	import { document, checked, documentLoading } from '$lib/stores/documents';
	import Checkbox from '../Checkbox.svelte';
	export let allChecked: boolean;
	import { Hash } from 'lucide-svelte';
	import Skeleton from '../Skeleton.svelte';
</script>

<div class="h-screen w-full overflow-x-auto bg-background">
	<table class="relative w-full text-left text-sm">
		<thead class="bg-accent/50 text-xs uppercase text-white">
			<tr>
				{#if $document.completions.length > 0}
					<th scope="col" class="px-2 py-3">
						<Hash class="h-4 w-4" />
					</th>
					<th scope="col" class="px-4 py-3">
						<Checkbox testId="checked-all" bind:checked={allChecked} />
					</th>
					<th scope="col" class="px-4 py-4">System</th>
					<th scope="col" class="px-4 py-3">User</th>
					<th scope="col" class="px-4 py-3">Assistant</th>
				{/if}
			</tr>
		</thead>
		{#if $documentLoading}
			<tbody class="w-full">
				{#each Array(3) as _}
					<tr class="w-full border-b border-ring/25 bg-transparent text-white">
						<td class="p-0">
							<Skeleton class="h-10 w-full rounded-none" />
						</td>
						<td class="p-0">
							<Skeleton class="h-10 w-full rounded-none" />
						</td>
						<td class="p-0">
							<Skeleton class="h-10 w-full rounded-none" />
						</td>
						<td class="p-0">
							<Skeleton class="h-10 w-full rounded-none" />
						</td>
						<td class="p-0">
							<Skeleton class="h-10 w-full rounded-none" />
						</td>
					</tr>
				{/each}
			</tbody>
		{:else}
			<tbody>
				{#each $document.completions as row, index}
					<tr class="w-full border-b border-ring/25 bg-transparent text-white">
						<td class="w-fit px-2 py-3 text-center">
							{index}
						</td>
						<td class="w-fit px-4 py-3">
							<Checkbox testId={`checked-${index}`} bind:checked={$checked[index]} />
						</td>
						<td
							class="box-content w-full min-w-[200px] max-w-[400px] overflow-hidden sm:min-w-[400px]"
						>
							<div class="overflow-scroll px-4 py-3">{row.messages[0].content}</div>
						</td>
						<td
							class=" box-content w-full min-w-[200px] max-w-[400px] overflow-hidden sm:min-w-[400px]"
						>
							<div class="overflow-scroll px-4 py-3">
								{row.messages[1].content}
							</div>
						</td>
						<td
							class="box-content w-full min-w-[200px] max-w-[400px] overflow-hidden pr-4 sm:min-w-[400px]"
						>
							<div class="w-full overflow-scroll px-4 py-3">
								{row.messages[2].content}
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		{/if}
	</table>
</div>
