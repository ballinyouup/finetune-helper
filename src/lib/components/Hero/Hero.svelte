<script lang="ts">
	import { ExternalLink, GraduationCap } from 'lucide-svelte';
	import Link from '../Link.svelte';
	import HeroText from './HeroText.svelte';
	import HeroContent from '../Three/HeroContent.svelte';
</script>

<div class="relative !z-0 h-full w-full overflow-hidden">
	<!-- Hero Container -->
	<div
		class="relative mx-auto flex h-full w-full max-w-2xl items-center justify-center overflow-hidden px-5 py-16 md:px-6 md:py-24 lg:py-32"
	>
		<!-- Component -->
		<div class="z-10 grid grid-cols-1 items-center justify-center gap-8 sm:gap-20">
			<!-- Hero Content -->
			<div
				class="z-10 flex h-full w-full -translate-y-10 flex-col border border-border bg-background p-4 sm:translate-y-20"
			>
				<!-- Hero Title -->
				<HeroText />
				<p class="mb-6 max-w-lg text-sm text-muted-foreground sm:text-xl md:mb-10 lg:mb-12">
					Create, Convert, and Validate Datasets Offline: Your Privacy-First Solution
				</p>
				<!-- Hero Button -->
				<div class="flex items-center gap-4">
					<Link href="/" class="flex items-center gap-2">
						<GraduationCap class="h-5 w-5" />
						<p class="self-start font-medium">Learn More</p>
					</Link>
					<Link href="/documents" variant="outline" class="flex items-center gap-2">
						<ExternalLink class="h-5 w-5" />
						<p class="self-start font-medium">Documents</p>
					</Link>
				</div>
			</div>
		</div>
	</div>
	<div
		class="absolute -bottom-40 h-96 w-full bg-gray-700 shadow-2xl shadow-gray-200 blur-[128px]"
	></div>
	<HeroContent />
</div>
