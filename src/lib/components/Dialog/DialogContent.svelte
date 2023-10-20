<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { flyAndScale } from '$lib/utils/flyAndScale';
	import { X } from 'lucide-svelte';
	import DialogButton from './DialogButton.svelte';
	export let content: ReturnType<typeof createDialog>['elements']['content'];
	export let title: ReturnType<typeof createDialog>['elements']['title'];
	export let description: ReturnType<typeof createDialog>['elements']['description'];
	export let close: ReturnType<typeof createDialog>['elements']['close'];
	import type { Completion } from '$lib/stores/output';
	import { db } from '$lib/database/database';
	export let completions: Completion[] = [];
	import { isGPT, isLlama } from '$lib/stores/output';
	import Button from '../Button.svelte';
	type Mode = 'GPT' | 'Llama';
	let completion: Completion = initCompletion(
		isGPT(completions[completions.length - 1])
			? 'GPT'
			: isLlama(completions[completions.length - 1])
			? 'Llama'
			: 'GPT'
	) as Completion;

	function initCompletion(mode: Mode): Completion {
		const newId = completions.length + 1;

		if (mode === 'GPT') {
			return {
				messages: [
					{ role: 'system', content: '' },
					{ role: 'user', content: '' },
					{ role: 'assistant', content: '' }
				],
				id: newId
			};
		} else if (mode === 'Llama') {
			return { prompt: '', completion: '', id: newId };
		} else
			return {
				messages: [
					{ role: 'system', content: '' },
					{ role: 'user', content: '' },
					{ role: 'assistant', content: '' }
				],
				id: newId
			};
	}

	function addCompletion() {
		db.table('completions').add(completion);
		completions = [...completions, completion];
		// Resetting the completion
		initCompletion(isGPT(completion) ? 'GPT' : isLlama(completion) ? 'Llama' : 'GPT');
	}

	function toggleCompletionMode(mode: Mode) {
		completion = initCompletion(mode) as Completion;
	}
</script>

<div
	class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] sm:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-primary p-6 shadow-lg"
	transition:flyAndScale={{
		duration: 150,
		y: 8,
		start: 0.96
	}}
	use:melt={$content}
>
	<h2 use:melt={$title} class="m-0 text-lg font-medium text-primary-foreground">
		Add Conversation
	</h2>
	<p use:melt={$description} class="mb-5 mt-2 leading-normal text-muted">
		Choose your dataset format and fill out the required fields.
	</p>
	<div class="flex gap-2 mb-4">
		<Button
			className={isGPT(completion) ? 'bg-background' : 'bg-secondary'}
			on:click={() => toggleCompletionMode('GPT')}
		>
			GPT
		</Button>
		<Button
			className={isLlama(completion) ? 'bg-background' : 'bg-secondary'}
			on:click={() => toggleCompletionMode('Llama')}
		>
			LLaMa 2
		</Button>
	</div>
	{#if isGPT(completion)}
		<fieldset class="mb-4 flex items-start gap-5">
			<label class="w-[90px] text-right text-primary-foreground" for="system">System</label>
			<textarea
				class="inline-flex h-20 w-full flex-1 items-center justify-center rounded-sm border border-solid p-2 leading-none text-black resize-none"
				id="system"
				bind:value={completion.messages[0].content}
				placeholder="Enter System Prompt..."
			/>
		</fieldset>
		<fieldset class="mb-4 flex items-start gap-5">
			<label class="w-[90px] text-right text-primary-foreground" for="user">User</label>
			<textarea
				class="inline-flex h-20 w-full flex-1 items-center justify-center rounded-sm border border-solid p-2 leading-none text-black resize-none"
				id="user"
				bind:value={completion.messages[1].content}
				placeholder="Enter User Prompt..."
			/>
		</fieldset>
		<fieldset class="mb-4 flex items-start gap-5">
			<label class="w-[90px] text-right text-primary-foreground" for="assistant">Assistant</label>
			<textarea
				class="inline-flex h-20 w-full flex-1 items-center justify-center rounded-sm border border-solid p-2 leading-none text-black resize-none"
				id="assistant"
				placeholder="Enter Assistant Prompt..."
				required
				bind:value={completion.messages[2].content}
			/>
		</fieldset>
	{:else if isLlama(completion)}
		<fieldset class="mb-4 flex items-start gap-5">
			<label class="w-[90px] text-right text-primary-foreground" for="user">Prompt</label>
			<textarea
				class="inline-flex h-20 w-full flex-1 items-center justify-center rounded-sm border border-solid p-2 leading-none text-black resize-none"
				id="user"
				bind:value={completion.prompt}
				placeholder="Enter Prompt..."
			/>
		</fieldset>
		<fieldset class="mb-4 flex items-start gap-5">
			<label class="w-[90px] text-right text-primary-foreground" for="assistant">Completion</label>
			<textarea
				class="inline-flex h-20 w-full flex-1 items-center justify-center rounded-sm border border-solid p-2 leading-none text-black resize-none"
				id="assistant"
				placeholder="Enter Completion..."
				required
				bind:value={completion.completion}
			/>
		</fieldset>
	{/if}
	<div class="mt-6 flex justify-end gap-4">
		<DialogButton
			{close}
			on:click={() => addCompletion()}
			className="inline-flex h-8 items-center justify-center rounded-lg hover:bg-secondary px-4 font-medium leading-none text-white border border-white/20 transition duration-150"
		>
			Add
		</DialogButton>
		<DialogButton
			{close}
			className="inline-flex h-8 items-center justify-center rounded-lg hover:bg-secondary px-4 font-medium leading-none text-white transition duration-150 border border-white/20"
		>
			Cancel
		</DialogButton>
	</div>
	<DialogButton
		{close}
		ariaLabel="close"
		className="absolute right-4 top-4 inline-flex
                items-center justify-center rounded-full p-1 text-primary-foreground
                hover:bg-secondary focus:bg-background transition"
	>
		<X class="square-4" />
	</DialogButton>
</div>
