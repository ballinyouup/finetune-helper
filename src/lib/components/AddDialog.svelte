<script lang="ts">
	import { X, Check, BadgeCheck } from 'lucide-svelte';
	import { type Completion, documents, format, document } from '$lib/stores/documents';
	import { db } from '$lib/database/database';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { v4 as uuidv4 } from 'uuid';
	import Button from './Button.svelte';
	import Dropzone from 'svelte-file-dropzone';
	import { Folder, Edit } from 'lucide-svelte';
	import ModeToggle from './ModeToggle.svelte';
	import type { createDialog } from '@melt-ui/svelte';
	import DialogButton from './Dialog/DialogButton.svelte';
	export let close: ReturnType<typeof createDialog>['elements']['close'];
	let completion: Completion = initCompletion() as Completion;
	let manualOpen = true;
	let fileOpen = false;
	let input: HTMLInputElement;
	interface Files extends File {
		verify?: boolean;
	}
	let files: {
		accepted: Files[];
		rejected: Files[];
	} = {
		accepted: [],
		rejected: []
	};
	let verifying = false;
	const patternLlama =
		/^\{\"text\"\:\"<s>\[INST\] <<SYS>>([^<>]*?[^<>])<\<\/SYS>\>([^<>]*?[^<>]) \[\/INST\] ([^<>]*?[^<>])<\/s>\"\}$/;
	const patternOpenAI =
		/^\{\"messages\"\:\[\{\"role\"\:\"system\",\"content\"\:\"([^"]*)\"\},\{\"role\"\:\"user\",\"content\"\:\"([^"]*)\"\},\{\"role\"\:\"assistant\",\"content\"\:\"([^"]*)\"\}\]\}$/;
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

	function verifyDataset() {
		verifying = true;

		files.accepted.forEach((file, index) => {
			files.accepted[index].verify = undefined;
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target === null) {
					return;
				} else if (e.target.result === null) {
					return;
				}
				const fileContent = e.target.result as string;
				const lines: string[] = fileContent.split('\n');
				lines.forEach((line, lineNumber) => {
					if ($format === 'Llama' ? patternLlama.test(line) : patternOpenAI.test(line)) {
						console.log(line);
						console.log(`Line ${lineNumber + 1} in ${file.name} is valid.`);
						files.accepted[index].verify = true;
					} else {
						console.log(line);
						console.log(`Line ${lineNumber + 1} in ${file.name} is not in the expected format.`);
						files.accepted[index].verify = false;
					}
				});
			};
			reader.readAsText(file);
		});
		verifying = false;
	}

	async function addFile() {
		if ($documents.length <= 0) {
			let uuid = uuidv4();
			await goto(`/documents/${uuid}`);
			await db.table('documents').add({
				id: uuid,
				name: 'Untitled',
				completions: [],
				createdAt: new Date(),
				format: $format
			});
			$documents = [
				...$documents,
				{
					id: uuid,
					name: 'Untitled',
					completions: [],
					createdAt: new Date(),
					format: $format
				}
			];
		}
		if (files.accepted.length > 0) {
			verifyDataset();
			console.log('Verified file');
			// completion = initCompletion();
			files.accepted.map((file, index) => {
				console.log(completion);
				files.accepted[index].verify = undefined;
				const reader = new FileReader();
				reader.onload = async (e) => {
					if (e.target === null) {
						return;
					} else if (e.target.result === null) {
						return;
					}
					const fileContent = e.target.result as string;
					const lines: string[] = fileContent.split('\n');
					for (const line of lines) {
						// return the values extracted from the regex
						console.log($format);
						const match = $format === 'Llama' ? patternLlama.exec(line) : patternOpenAI.exec(line);
						if (match) {
							console.log(match[1], match[2], match[3]);
							completion = {
								messages: [
									{ role: 'system', content: match[1] },
									{ role: 'user', content: match[2] },
									{ role: 'assistant', content: match[3] }
								]
							};
							console.log('Completion: ', completion);
							console.log('Completions: ', $document.completions);
							if ($document.completions.length > 0) {
								await db.table('documents').update($page.params.id, {
									completions: [...$document.completions, completion]
								});
								$document.completions = [...$document.completions, completion];
							} else {
								await db.table('documents').update($page.params.id, {
									completions: [completion]
								});
								$document.completions = [completion];
							}
							console.log('Completions: ', $document.completions);
							console.log('Matches: ', match);
							console.log('Added Completion');
						} else {
							console.log('No match');
						}
					}
				};
				reader.readAsText(file);
			});
		}
	}
</script>

<!-- TODO: Add a toggle to expand the system, user, assistant prompts -->

<div class="mb-2 flex gap-2">
	<Button
		class="w-fit"
		disabled={fileOpen}
		on:click={() => {
			manualOpen = false;
			fileOpen = !fileOpen;
		}}
	>
		<Folder />
	</Button>
	<Button
		class="w-fit"
		disabled={manualOpen}
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
	<!-- <span>Estimated Tokens: 4096</span> -->
{:else if fileOpen}
	<div class="flex flex-col gap-2">
		<ModeToggle />
		{#if files.accepted.length > 0 || files.rejected.length > 0}
			<div class="flex flex-col gap-2">
				{#each files.accepted as file}
					<p class="flex items-center gap-2 text-white">
						{file.name}
					</p>
				{/each}
				<!-- <Button disabled={verifying === true} variant={verifying ? 'ghost' : 'default'}>
					Verify Dataset
				</Button> -->
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
		ariaLabel="dialog-add"
		{close}
		on:click={async () => {
			if (manualOpen) {
				await addCompletion();
			} else {
				await addFile();
			}
		}}
		className="inline-flex h-8 items-center justify-center rounded-lg hover:bg-secondary px-4 font-medium leading-none text-white border border-white/20 transition duration-150"
	>
		Add
	</DialogButton>
	<DialogButton
		ariaLabel="dialog-cancel"
		{close}
		className="w-fit inline-flex h-8 items-center justify-center rounded-lg hover:bg-secondary px-4 font-medium leading-none text-white transition duration-150 border border-white/20"
	>
		Cancel
	</DialogButton>
</div>
