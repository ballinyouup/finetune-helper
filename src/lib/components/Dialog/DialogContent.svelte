<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { flyAndScale } from '$lib/utils/flyAndScale';
	import { X } from 'lucide-svelte';
	import DialogButton from './DialogButton.svelte';
	export let content: ReturnType<typeof createDialog>['elements']['content'];
	export let title: ReturnType<typeof createDialog>['elements']['title'];
	export let description: ReturnType<typeof createDialog>['elements']['description'];
	export let close: ReturnType<typeof createDialog>['elements']['close'];
	import { type Completion, documents } from '$lib/stores/documents';
	import { db } from '$lib/database/database';
	import { document, format } from '$lib/stores/documents';
	export let testId: string;
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { v4 as uuidv4 } from 'uuid';
	let completion: Completion = initCompletion() as Completion;

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
			await goto(`http://localhost:5173/${uuid}`);
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

	// function toggleCompletionMode(mode: Mode) {
	// 	completion = initCompletion(mode) as Completion;
	// }
</script>

<!-- TODO: Add a toggle to expand the system, user, assistant prompts -->
<div
	data-testId={testId}
	class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-xl border border-ring/50 bg-card p-6 shadow-lg sm:max-w-[450px]"
	transition:flyAndScale={{
		duration: 150,
		y: 8,
		start: 0.96
	}}
	use:melt={$content}
>
	<h2 use:melt={$title} class="m-0 text-lg font-medium text-white">Add Conversation</h2>
	<p use:melt={$description} class="mb-5 mt-2 leading-normal text-muted-foreground">
		Choose your dataset format and fill out the required fields.
	</p>

	<fieldset class="mb-4 flex flex-col items-start gap-5">
		<label class="text-white" for="system">System</label>
		<textarea
			data-testId="textarea-system"
			class="inline-flex h-full w-full flex-1 items-center justify-center rounded-sm border border-solid p-2 leading-none text-black"
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
	<div class="mt-6 flex justify-end gap-4">
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
			className="inline-flex h-8 items-center justify-center rounded-lg hover:bg-secondary px-4 font-medium leading-none text-white transition duration-150 border border-white/20"
		>
			Cancel
		</DialogButton>
	</div>
	<DialogButton
		data-testId="dialog-close"
		{close}
		ariaLabel="close"
		className="absolute right-4 top-4 inline-flex
                items-center justify-center rounded-full p-1 text-primary-foreground
                hover:bg-secondary focus:bg-background transition"
	>
		<X class="square-4 text-white" />
	</DialogButton>
</div>
