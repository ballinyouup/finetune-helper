<script lang="ts">
	import Icons from '../Icons.svelte';
	import FooterSection from './FooterSection.svelte';
	import FooterLink from './FooterLink.svelte';
	import FooterSocial from './FooterSocial.svelte';
	import { FooterData } from './FooterData';
</script>

<footer class="text-white">
	<div class="mx-auto w-full max-w-7xl px-5 py-12">
		<div class="grid grid-cols-1 justify-between gap-8 sm:grid-cols-3">
			{#each FooterData as data}
				<FooterSection title={data.title}>
					{#each data.data as itemData}
						<FooterLink href={itemData.href}>{itemData.name}</FooterLink>
					{/each}
				</FooterSection>
			{/each}
			<FooterSection>
				<h6 class="text-white">FineTune Helper</h6>
				<div class="-ml-2 grid w-fit grid-cols-1 space-y-0 md:grid-cols-2">
					<FooterSocial href="https://instagram.com/protection4allinsurance" name="Twitter">
						<Icons icon="twitter" />
					</FooterSocial>
					<FooterSocial href="https://instagram.com/protection4allinsurance" name="Email">
						<Icons fill="transparent" icon="email" />
					</FooterSocial>
				</div>
			</FooterSection>
		</div>
	</div>
</footer>
