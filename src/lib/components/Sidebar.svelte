<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import {
		documents,
		edit,
		newDocument,
		deleteDocument,
		editDocumentName,
		documentLoading
	} from '$lib/stores/documents';
	import { X, Edit, Save, Trash } from 'lucide-svelte';
	import { page } from '$app/stores';
	import Skeleton from '$lib/components/Skeleton.svelte';
	import Spinner from './Spinner.svelte';
</script>

<div class="relative hidden w-1/6 min-w-[280px] flex-col gap-2 px-4 md:flex">
	<Button aria-label="add-document" on:click={async () => await newDocument()}>+ Document</Button>
	{#if $documentLoading}
		<!-- <div class="flex flex-col gap-2 pt-2">
			<Skeleton class="w-full h-8" />
			<Skeleton class="w-full h-8" />
			<Skeleton class="w-full h-8" />
		</div> -->
		<Spinner />
	{:else}
		<div class="flex flex-col gap-2">
			{#each $documents as doc, index}
				{#if doc.id && doc.name !== ''}
					<div class="flex h-10 w-full items-center justify-between">
						{#if $edit[index] === false}
							<a
								class="h-fit overflow-hidden text-ellipsis whitespace-nowrap p-2 text-lg hover:underline"
								href={`/${doc.id}`}
								aria-label={`${doc.name}`}
							>
								{doc.name}
							</a>
							{#if $page.params.id === doc.id.toString()}
								<div class="flex w-fit items-center gap-2">
									<Button
										className="px-2 h-fit w-fit"
										variant="ghost"
										aria-label="Edit"
										on:click={() => ($edit[index] = true)}
									>
										<Edit strokeWidth="2" class="h-5 w-5" />
									</Button>
									<Button
										className="px-2 h-fit w-fit"
										variant="destructive"
										aria-label="Delete"
										on:click={async () => await deleteDocument(doc.id)}
									>
										<Trash strokeWidth="2" class="h-5 w-5" />
									</Button>
								</div>
							{:else if $page.params.id === undefined && index === 0}
								<div class="flex w-fit items-center gap-2">
									<Button
										className="px-2 h-fit w-fit"
										variant="ghost"
										aria-label="Edit"
										on:click={() => ($edit[index] = true)}
									>
										<Edit strokeWidth="2" class="h-5 w-5" />
									</Button>
									<Button
										className="px-2 h-fit w-fit"
										variant="destructive"
										aria-label="Delete"
										on:click={async () => await deleteDocument(doc.id)}
									>
										<Trash strokeWidth="2" class="h-5 w-5" />
									</Button>
								</div>
							{/if}
						{:else}
							<input
								aria-label="Name"
								class="w-full p-0.5 text-lg text-black"
								type="text"
								bind:value={doc.name}
							/>
							<div class="flex w-fit min-w-max items-center gap-2">
								<Button
									className="px-2 h-fit w-fit"
									variant="ghost"
									aria-label="Save"
									on:click={async () => await editDocumentName(doc.id, doc.name)}
								>
									<Save strokeWidth="2" class="h-5 w-5" />
								</Button>
								<Button
									className="px-2 h-fit w-fit"
									variant="ghost"
									aria-label="Cancel"
									on:click={() => ($edit = Array($documents.length).fill(false))}
								>
									<X strokeWidth="2" class="h-5 w-5" />
								</Button>
							</div>
						{/if}
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</div>
