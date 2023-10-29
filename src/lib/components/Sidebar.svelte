<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';
	import { documents, edit, newDocument, deleteDocument, editDocumentName, getDocuments } from '$lib/stores/documents';
	import { X, Edit, Save, Trash } from 'lucide-svelte';
	import { page } from '$app/stores';

	onMount(async () => {
		await getDocuments()
	});
	
</script>

<div class="hidden flex-col lg:flex min-w-[280px] px-4 w-1/6 gap-2">
	<Button on:click={async () => await newDocument()}>+ Document</Button>
	<div class="flex flex-col gap-2">
		{#each $documents as doc, index}
			<div class="w-full flex items-center justify-between h-10">
				{#if $edit[index] === false}
					<a
						class="hover:underline p-2 text-lg h-fit whitespace-nowrap overflow-hidden text-ellipsis"
						href={`/${doc.id}`}
					>
						{doc.name}
					</a>
					{#if $page.params.id === doc.id.toString()}
						<div class="flex items-center gap-2 w-fit">
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
						<div class="flex items-center gap-2 w-fit">
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
					<input class="p-0.5 w-full text-black text-lg" type="text" bind:value={doc.name} />
					<div class="flex items-center w-fit gap-2 min-w-max">
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
</div>
