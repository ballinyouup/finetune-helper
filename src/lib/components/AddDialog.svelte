<script lang="ts">
	import { X, Check } from 'lucide-svelte';
	import { type Completion, documents, format, document } from '$lib/stores/documents';
	import { db } from '$lib/database/database';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { v4 as uuidv4 } from 'uuid';
	import Button from './Button.svelte';
	import Dropzone from 'svelte-file-dropzone/Dropzone.svelte';
	import { Folder, Edit } from 'lucide-svelte';
	import ModeToggle from './ModeToggle.svelte';
	import type { createDialog } from '@melt-ui/svelte';
	import DialogButton from './Dialog/DialogButton.svelte';
	export let close: ReturnType<typeof createDialog>['elements']['close'];
	let completion: Completion = initCompletion() as Completion;
	let manualOpen = false;
	let fileOpen = false;
	let input: HTMLInputElement;

	let files: {
		accepted: File[];
		rejected: File[];
	} = {
		accepted: [],
		rejected: []
	};
	let verifying = false;
	function handleFilesSelect(e: CustomEvent) {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
	}
	function initCompletion(): Completion {
		return {
			messages: [
				{ role: 'system', content: '' },
				{ role: 'user', content: '' },
				{ role: 'assistant', content: '' }
			]
		};
	}

	async function addCompletion() {
		if ($documents.length > 0) {
			await db.table('documents').update($page.params.id, {
				completions: [...$document.completions, completion]
			});
			$document.completions = [...$document.completions, completion];
		} else {
			let uuid = uuidv4();
			await goto(`/documents/${uuid}`);
			await db.table('documents').add({
				id: uuid,
				name: 'Untitled',
				completions: [completion],
				createdAt: new Date(),
				format: $format
			});
			$documents = [
				...$documents,
				{
					id: uuid,
					name: 'Untitled',
					completions: [completion],
					createdAt: new Date(),
					format: $format
				}
			];
			$document.completions = [completion];
		}
		completion = initCompletion();
	}
</script>

<!-- TODO: Add a toggle to expand the system, user, assistant prompts -->

<div class="mb-2 flex gap-2">
	<Button
		class="w-fit"
		on:click={() => {
			manualOpen = false;
			fileOpen = !fileOpen;
		}}
	>
		<Folder />
	</Button>
	<Button
		class="w-fit"
		on:click={() => {
			fileOpen = false;
			manualOpen = !manualOpen;
		}}
	>
		<Edit />
	</Button>
</div>
{#if manualOpen}
	<fieldset class="mb-4 flex flex-col items-start gap-5">
		<label class="text-white" for="system">System</label>
		<textarea
			data-testId="textarea-system"
			class="inline-flex h-full w-full flex-1 resize-none items-center justify-center rounded-sm border border-solid p-2 leading-none text-black"
			id="system"
			bind:value={completion.messages[0].content}
			placeholder="Enter System Prompt..."
		/>
	</fieldset>
	<fieldset class="mb-4 flex flex-col items-start gap-5">
		<label class="text-white" for="user">User</label>
		<textarea
			data-testId="textarea-user"
			class="inline-flex h-20 w-full flex-1 resize-none items-center justify-center rounded-sm border border-solid p-2 leading-none text-black"
			id="user"
			bind:value={completion.messages[1].content}
			placeholder="Enter User Prompt..."
		/>
	</fieldset>
	<fieldset class="mb-4 flex flex-col items-start gap-5">
		<label class="text-white" for="assistant">Assistant</label>
		<textarea
			data-testId="textarea-assistant"
			class="inline-flex h-20 w-full flex-1 resize-none items-center justify-center rounded-sm border border-solid p-2 leading-none text-black"
			id="assistant"
			placeholder="Enter Assistant Prompt..."
			required
			bind:value={completion.messages[2].content}
		/>
	</fieldset>
	<span>Estimated Tokens: 4096</span>
{:else if fileOpen}
	<div class="flex flex-col gap-2">
		<ModeToggle />
		{#if files.accepted.length > 0 || files.rejected.length > 0}
			<div class="flex flex-col gap-2">
				
				<Button
					disabled={verifying === true}
					variant={verifying ? 'ghost' : 'default'}
				>
					Verify Dataset
				</Button>
			</div>
		{:else}
			<Dropzone
				containerClasses="[&>p]:text-white [&>p]:font-medium [&>p]:font-poppins"
				containerStyles="border-radius: 0.375rem; background-color:transparent; hover:border: 1px solid white;"
				accept="/*"
				inputElement={input}
				required
				on:drop={handleFilesSelect}
			/>
		{/if}
	</div>
{/if}

<div class="mt-6 flex justify-end gap-2">
	<DialogButton
		data-testId="dialog-add"
		{close}
		on:click={() => addCompletion()}
		className="inline-flex h-8 items-center justify-center rounded-lg hover:bg-secondary px-4 font-medium leading-none text-white border border-white/20 transition duration-150"
	>
		Add
	</DialogButton>
	<DialogButton
		data-testId="dialog-cancel"
		{close}
		className="w-fit inline-flex h-8 items-center justify-center rounded-lg hover:bg-secondary px-4 font-medium leading-none text-white transition duration-150 border border-white/20"
	>
		Cancel
	</DialogButton>
</div>
