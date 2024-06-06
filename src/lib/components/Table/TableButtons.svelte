<script lang="ts">
	import { document, checked, format } from '$lib/stores/documents';
	import { db } from '$lib/database/database';
	import { Trash, Code, Download, Plus, Check, X, BadgeCheck } from 'lucide-svelte';
	import Dialog from '../Dialog/Dialog.svelte';
	import Button from '../Button.svelte';
	import AddDialog from '../AddDialog.svelte';
	import ModeToggle from '../ModeToggle.svelte';
	import { exportCSV, exportJSONL } from '$lib/utils/export';
	import Dropzone from 'svelte-file-dropzone';
	import Spinner from '../Spinner.svelte';
	export let tabOpen: boolean;
	export let allChecked: boolean;
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
	function handleFilesSelect(e: CustomEvent) {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
	}
	async function deleteCheckedItems() {
		const updatedCompletions = $document.completions.filter((_, index) => {
			return !$checked[index];
		});
		db.table('documents').put({ ...$document, completions: updatedCompletions });
		$document = { ...$document, completions: updatedCompletions };
		allChecked = false;
		$checked = Array($document.completions.length).fill(false);
	}
	function verifyDataset() {
		verifying = true;
		const patternLlama =
			/^\{\"text\"\:\"<s>\[INST\] <<SYS>>([^<>]*?[^<>])<\<\/SYS>\>([^<>]*?[^<>]) \[\/INST\] ([^<>]*?[^<>])<\/s>\"\}$/;
		const patternOpenAI =
			/^\{\"messages\"\:\[\{\"role\"\:\"system\",\"content\"\:\"([^"]*)\"\},\{\"role\"\:\"user\",\"content\"\:\"([^"]*)\"\},\{\"role\"\:\"assistant\",\"content\"\:\"([^"]*)\"\}\]\}$/;

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
</script>

<div
	class="flex flex-col items-center justify-between space-y-3 bg-popover p-4 md:flex-row md:space-x-4 md:space-y-0"
>
	<div
		class="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:flex-row md:items-center md:space-x-3 md:space-y-0"
	>
		<div class="flex w-full justify-between gap-2">
			<div class="flex gap-2">
				<Dialog triggerTooltip="Add">
					<svelte:fragment slot="trigger">
						<Plus class="h-5 w-5 text-black" strokeWidth="2" />
					</svelte:fragment>
					<svelte:fragment slot="title">Add Dataset Entry</svelte:fragment>
					<svelte:fragment slot="description">
						Add a new entry to your dataset document or import files
					</svelte:fragment>
					<svelte:fragment slot="content" let:close>
						<AddDialog {close} />
					</svelte:fragment>
				</Dialog>
				<Button
					tooltip="Delete"
					data-testId="delete"
					on:click={deleteCheckedItems}
					variant="destructive"
					class="py-[20.5px]"
				>
					<Trash class="h-5 w-5" />
				</Button>
				<Dialog triggerTooltip="Export">
					<svelte:fragment slot="trigger">
						<Download class="h-5 w-5 text-black" strokeWidth="2" />
					</svelte:fragment>
					<svelte:fragment slot="title">Export Dataset</svelte:fragment>
					<svelte:fragment slot="description">
						Add a new completion to your document
					</svelte:fragment>
					<svelte:fragment slot="content" let:close>
						<div class="flex h-fit flex-col gap-2">
							<ModeToggle />
							<div class="flex w-full justify-end gap-2">
								<Button
									aria-label="export-jsonl"
									action={close}
									on:click={() => exportJSONL($document.completions)}
								>
									JSONL
								</Button>
								<Button
									aria-label="export-csv"
									action={close}
									on:click={() => exportCSV($document.completions)}
								>
									CSV
								</Button>
							</div>
						</div>
					</svelte:fragment>
				</Dialog>
				<Dialog triggerTooltip="Validate">
					<svelte:fragment slot="trigger">
						<BadgeCheck class="h-5 w-5 text-black" strokeWidth="2" />
					</svelte:fragment>
					<svelte:fragment slot="title">Validate Dataset</svelte:fragment>
					<svelte:fragment slot="description">
						Import a file to validate your dataset entries based on the format.
					</svelte:fragment>
					<svelte:fragment slot="content" let:close>
						<div class="flex flex-col gap-2">
							<ModeToggle />
							{#if files.accepted.length > 0 || files.rejected.length > 0}
								<div class="flex flex-col gap-2">
									{#each files.accepted as file}
										<p class="flex items-center gap-2 text-white">
											{file.name}
											{#if file.verify === true}
												<Check class="text-green-600" strokeWidth="4" />
											{:else if file.verify === false}
												<X class="text-red-600" strokeWidth="4" />
											{/if}
										</p>
									{/each}
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
							<div class="flex justify-end gap-2">
								<Button disabled={verifying} on:click={verifyDataset}>
									{#if verifying}
										<Spinner />
									{:else}
										Verify
									{/if}
								</Button>
								<Button aria-label="close" action={close} on:click={() => (files.accepted = [])}>
									Cancel
								</Button>
							</div>
						</div>
					</svelte:fragment>
				</Dialog>
			</div>
			<div class="flex gap-2">
				<Button
					tooltip="Code"
					variant="default"
					class="gap-2"
					on:click={() => (tabOpen = true)}
					aria-label="view-code"
				>
					<Code class="h-5 w-5" />
				</Button>
			</div>
		</div>
	</div>
</div>
