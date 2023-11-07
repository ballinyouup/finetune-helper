<script lang="ts">
	import { Code, ExternalLink, Eye, GraduationCap, Hash, TableIcon, X } from 'lucide-svelte';
	import { buttonVariants } from '$lib';
	import { cn } from '$lib/utils/cn';
	import type { Completion } from '$lib/stores/documents';
	import Button from './Button.svelte';
	import ExportDialog from './ExportDialog.svelte';
	import { serializeCompletionArray } from '$lib/utils/export';
	import { Highlight, LineNumbers } from 'svelte-highlight';
	import CopyButton from './CopyButton.svelte';
	import { json } from 'svelte-highlight/languages';
	import Icons from './Icons.svelte';
	let tabOpen = false;
	let format: 'OpenAI' | 'Llama' = 'OpenAI';
	let completions: Completion[] = [
		{
			messages: [
				{
					role: 'system',
					content: 'You are a friendly assistant'
				},
				{
					role: 'user',
					content: ''
				},
				{
					role: 'assistant',
					content: ''
				}
			]
		},
		{
			messages: [
				{
					role: 'system',
					content: ''
				},
				{
					role: 'user',
					content: ''
				},
				{
					role: 'assistant',
					content: ''
				}
			]
		},
		{
			messages: [
				{
					role: 'system',
					content: ''
				},
				{
					role: 'user',
					content: ''
				},
				{
					role: 'assistant',
					content: ''
				}
			]
		},
		{
			messages: [
				{
					role: 'system',
					content: ''
				},
				{
					role: 'user',
					content: ''
				},
				{
					role: 'assistant',
					content: ''
				}
			]
		},
		{
			messages: [
				{
					role: 'system',
					content: ''
				},
				{
					role: 'user',
					content: ''
				},
				{
					role: 'assistant',
					content: ''
				}
			]
		},
		{
			messages: [
				{
					role: 'system',
					content: ''
				},
				{
					role: 'user',
					content: ''
				},
				{
					role: 'assistant',
					content: ''
				}
			]
		},
		{
			messages: [
				{
					role: 'system',
					content: ''
				},
				{
					role: 'user',
					content: ''
				},
				{
					role: 'assistant',
					content: ''
				}
			]
		},
		{
			messages: [
				{
					role: 'system',
					content: ''
				},
				{
					role: 'user',
					content: ''
				},
				{
					role: 'assistant',
					content: ''
				}
			]
		}
	];
	let code = '';
	let prettify = false;
	$: if (format) {
		code = serializeCompletionArray(completions, prettify);
	}
</script>

<div>
	<!-- Hero Container -->
	<div class="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
		<!-- Component -->
		<div class="grid items-start justify-items-start gap-8 sm:gap-20 lg:grid-cols-2">
			<!-- Hero Content -->
			<div class="flex flex-col">
				<!-- Hero Title -->
				<h1 class="mb-4 text-4xl font-bold md:text-6xl">
					Effortless Dataset Creation Without Coding Hassles
				</h1>
				<p class="mb-6 max-w-lg text-sm text-muted-foreground sm:text-xl md:mb-10 lg:mb-12">
					Create, Convert, and Validate Datasets Offline: Your Privacy-First Solution
				</p>
				<!-- Hero Button -->
				<div class="flex items-center gap-4">
					<a
						href="/"
						class={cn(
							buttonVariants({
								variant: 'default'
							}),
							'gap-2'
						)}
					>
						<GraduationCap class="h-5 w-5" />
						<p class="self-start font-medium">Learn More</p>
					</a>
					<a
						href="/documents"
						class={cn(
							buttonVariants({
								variant: 'outline'
							}),
							'items-center justify-center gap-2'
						)}
					>
						<ExternalLink class="h-5 w-5" />
						<p class="self-start font-medium">Documents</p>
					</a>
				</div>
			</div>
			<div class="flex h-full w-full items-center justify-center">
				<div class="h-full w-full overflow-x-auto bg-background">
					{#if tabOpen}
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
								<div class="flex items-center">
									<Button
										on:click={() => (format = 'OpenAI')}
										variant={`${format === 'OpenAI' ? 'default' : 'outline'}`}
										className="rounded-none transition-none"
										aria-label="format-openai"
									>
										<Icons icon="openai" fill={`${format === 'OpenAI' ? 'black' : 'white'}`} />
									</Button>
									<Button
										on:click={() => (format = 'Llama')}
										variant={`${format === 'Llama' ? 'default' : 'outline'}`}
										className="rounded-none transition-none"
										aria-label="format-llama"
									>
										<Icons icon="meta" fill={`${format === 'Llama' ? 'black' : 'white'}`} />
									</Button>
								</div>
								<Button on:click={() => (tabOpen = false)} aria-label="view-table">
									<TableIcon class="h-5 w-5" />
								</Button>
							</div>
							<div class="relative h-fit w-full overflow-scroll">
								<Highlight language={json} {code} let:highlighted>
									<div class="w-screen bg-secondary p-2.5">
										<span>JSON</span>
										<CopyButton />
									</div>
									<LineNumbers {highlighted} hideBorder />
								</Highlight>
							</div>
						</div>
					{:else}
						<div
							class="flex flex-col items-center justify-between space-y-3 bg-popover p-4 md:flex-row md:space-x-4 md:space-y-0"
						>
							<div
								class="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:flex-row md:items-center md:space-x-3 md:space-y-0"
							>
								<div class="flex w-full justify-between gap-2">
									<div class="flex gap-2">
										<ExportDialog />
									</div>
									<div class="flex gap-2">
										<Button
											variant="default"
											className="gap-2"
											on:click={() => (tabOpen = true)}
											aria-label="view-code"
										>
											<Code class="h-5 w-5" />
										</Button>
									</div>
								</div>
							</div>
						</div>
						<table class="relative w-full text-left text-sm">
							<thead class="bg-accent/50 text-xs uppercase text-white">
								<tr>
									{#if completions.length > 0}
										<th scope="col" class="px-2 py-3">
											<Hash class="h-4 w-4" />
										</th>
										<th scope="col" class="px-4 py-4">System</th>
										<th scope="col" class="px-4 py-3">User</th>
										<th scope="col" class="px-4 py-3">Assistant</th>
									{/if}
								</tr>
							</thead>
							<tbody>
								{#each completions as row, index}
									<tr class="w-full border-b border-ring/25 bg-secondary text-white">
										<td class="w-fit px-2 py-3 text-center">
											{index}
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
						</table>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
