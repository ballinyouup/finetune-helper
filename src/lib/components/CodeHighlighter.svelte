<script lang="ts">
	import { X, Eye } from "lucide-svelte";
    export let prettify = false;
    export let tabOpen = false;
    export let code = "";
    import Button from "./Button.svelte";
    import { TableIcon } from "lucide-svelte";
	import { Highlight, LineNumbers } from "svelte-highlight";
	import { json } from "svelte-highlight/languages";
    import CopyButton from "./CopyButton.svelte";
</script>

<div class="flex h-full flex-col w-full gap-2 p-0 border border-ring/25">
    <div class="flex w-full justify-end items-end gap-2 p-4 pb-2">
        <Button className="gap-2" on:click={() => (prettify = !prettify)}>
            {#if prettify}
                <X class="h-5 w-5" />
            {:else}
                <Eye class="h-5 w-5" />
            {/if}
            Pretty
        </Button>
        <Button on:click={() => (tabOpen = false)} aria-label="view-table">
            <TableIcon class="h-5 w-5" />
        </Button>
    </div>
    <div class="overflow-scroll h-screen w-full relative">
        <Highlight language={json} {code} let:highlighted>
            <div class="w-screen bg-secondary p-2.5">
                <span>JSON</span>
                <CopyButton />
            </div>
            <LineNumbers {highlighted} hideBorder />
        </Highlight>
    </div>
</div>