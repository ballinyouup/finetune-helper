<script lang="ts">
	export let href: string;
	export let name: string;
</script>

<a
	{href}
	class="flex items-center gap-1 p-2.5 hover:bg-secondary w-full rounded-lg transition-all duration-100 h-fit"
>
	<slot />
	<span>{name}</span>
</a>
