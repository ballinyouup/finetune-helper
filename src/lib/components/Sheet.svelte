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
	import Skeleton from './Skeleton.svelte';
	import Spinner from './Spinner.svelte';
	import { animate } from 'motion';
	export let sheetOpen = false;
	let sheet: HTMLElement;
	$: if (sheet) {
		if (sheetOpen) {
			animate(
				sheet,
				{
					right: '0'
				},
				{
					duration: 0.4,
					easing: 'ease-in-out'
				}
			);
		} else {
			animate(
				sheet,
				{
					right: '-100vw'
				},
				{
					duration: 0.4,
					easing: 'ease-in-out'
				}
			);
		}
	}
</script>

<div
	bind:this={sheet}
	class="fixed right-0 top-0 z-40 flex h-full w-full flex-col items-start gap-4 overflow-hidden bg-background p-4"
>
	<div class="z-50 flex w-full justify-between">
		<h6>Documents</h6>
		<button class="" on:click={() => (sheetOpen = false)}><X /></button>
	</div>
	<div class="relative flex w-full flex-col gap-2">
		<Button on:click={async () => await newDocument()}>+ Document</Button>
		{#if $documentLoading}
			<!-- <div class="flex flex-col gap-2 pt-2 w-full">
				<Skeleton class="w-full h-8" />
				<Skeleton class="w-full h-8" />
				<Skeleton class="w-full h-8" />
			</div> -->
			<Spinner />
		{:else}
			<div class="flex flex-col gap-2">
				{#each $documents as doc, index}
					<div class="flex h-10 w-full items-center justify-between">
						{#if $edit[index] === false}
							<a
								class="h-fit overflow-hidden text-ellipsis whitespace-nowrap p-2 text-lg hover:underline"
								href={`/documents/${doc.id}`}
							>
								{doc.name}
							</a>
							{#if $page.params.id === doc.id.toString()}
								<div class="flex w-fit items-center gap-2">
									<Button
										className="px-2 h-fit w-fit"
										variant="ghost"
										on:click={() => ($edit[index] = true)}
									>
										<Edit strokeWidth="2" class="h-5 w-5" />
									</Button>
									<Button
										className="px-2 h-fit w-fit"
										variant="destructive"
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
										on:click={() => ($edit[index] = true)}
									>
										<Edit strokeWidth="2" class="h-5 w-5" />
									</Button>
									<Button
										className="px-2 h-fit w-fit"
										variant="destructive"
										on:click={async () => await deleteDocument(doc.id)}
									>
										<Trash strokeWidth="2" class="h-5 w-5" />
									</Button>
								</div>
							{/if}
						{:else}
							<input class="w-full p-0.5 text-lg text-black" type="text" bind:value={doc.name} />
							<div class="flex w-fit min-w-max items-center gap-2">
								<Button
									className="px-2 h-fit w-fit"
									variant="ghost"
									on:click={async () => await editDocumentName(doc.id, doc.name)}
								>
									<Save strokeWidth="2" class="h-5 w-5" />
								</Button>
								<Button
									className="px-2 h-fit w-fit"
									variant="ghost"
									on:click={() => ($edit = Array($documents.length).fill(false))}
								>
									<X strokeWidth="2" class="h-5 w-5" />
								</Button>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
