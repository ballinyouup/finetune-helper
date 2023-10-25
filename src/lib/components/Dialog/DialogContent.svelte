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
	import { completions } from '$lib/stores/output';
	import { isGPT, isLlama } from '$lib/stores/output';
	import Button from '../Button.svelte';
	export let testId: string;
	type Mode = 'GPT' | 'Llama';
	let completion: Completion = initCompletion(
		isGPT($completions[$completions.length - 1])
			? 'GPT'
			: isLlama($completions[$completions.length - 1])
			? 'Llama'
			: 'GPT'
	) as Completion;

	function initCompletion(mode: Mode): Completion {
		const newId = $completions.length + 1;

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
		$completions = [...$completions, completion];
		// Resetting the completion
		initCompletion(isGPT(completion) ? 'GPT' : isLlama(completion) ? 'Llama' : 'GPT');
	}

	function toggleCompletionMode(mode: Mode) {
		completion = initCompletion(mode) as Completion;
	}
</script>

<div
	data-testId={testId}
	class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] sm:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-card p-6 shadow-lg border-ring/50 border"
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
	<div class="flex gap-2 mb-4">
		<Button
			data-testId="set-gpt"
			variant={isGPT(completion) ? 'default' : 'outline'}
			on:click={() => toggleCompletionMode('GPT')}
		>
			GPT
		</Button>
		<Button
			data-testId="set-llama"
			variant={isLlama(completion) ? 'default' : 'outline'}
			on:click={() => toggleCompletionMode('Llama')}
		>
			LLaMa 2
		</Button>
	</div>
	{#if isGPT(completion)}
		<fieldset class="mb-4 flex items-start gap-5">
			<label class="w-[90px] text-right text-white" for="system">System</label>
			<textarea
				data-testId="textarea-system"
				class="inline-flex h-20 w-full flex-1 items-center justify-center rounded-sm border border-solid p-2 leading-none text-black resize-none"
				id="system"
				bind:value={completion.messages[0].content}
				placeholder="Enter System Prompt..."
			/>
		</fieldset>
		<fieldset class="mb-4 flex items-start gap-5">
			<label class="w-[90px] text-right text-white" for="user">User</label>
			<textarea
				data-testId="textarea-user"
				class="inline-flex h-20 w-full flex-1 items-center justify-center rounded-sm border border-solid p-2 leading-none text-black resize-none"
				id="user"
				bind:value={completion.messages[1].content}
				placeholder="Enter User Prompt..."
			/>
		</fieldset>
		<fieldset class="mb-4 flex items-start gap-5">
			<label class="w-[90px] text-right text-white" for="assistant">Assistant</label>
			<textarea
				data-testId="textarea-assistant"
				class="inline-flex h-20 w-full flex-1 items-center justify-center rounded-sm border border-solid p-2 leading-none text-black resize-none"
				id="assistant"
				placeholder="Enter Assistant Prompt..."
				required
				bind:value={completion.messages[2].content}
			/>
		</fieldset>
	{:else if isLlama(completion)}
		<fieldset class="mb-4 flex items-start gap-5">
			<label class="w-[90px] text-right text-white" for="prompt">Prompt</label>
			<textarea
				data-testId="textarea-prompt"
				class="inline-flex h-20 w-full flex-1 items-center justify-center rounded-sm border border-solid p-2 leading-none text-black resize-none"
				id="prompt"
				bind:value={completion.prompt}
				placeholder="Enter Prompt..."
			/>
		</fieldset>
		<fieldset class="mb-4 flex items-start gap-5">
			<label class="w-[90px] text-right text-white" for="completion">Completion</label>
			<textarea
				data-testId="textarea-completion"
				class="inline-flex h-20 w-full flex-1 items-center justify-center rounded-sm border border-solid p-2 leading-none text-black resize-none"
				id="completion"
				placeholder="Enter Completion..."
				required
				bind:value={completion.completion}
			/>
		</fieldset>
	{/if}
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
