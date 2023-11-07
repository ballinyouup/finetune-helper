<script lang="ts">
	import { ExternalLink, GraduationCap } from 'lucide-svelte';
	import Link from './Link.svelte';
</script>

<div>
	<!-- Hero Container -->
	<div class="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
		<!-- Component -->
		<div class="grid items-start justify-items-start gap-8 sm:gap-20 lg:grid-cols-2">
			<!-- Hero Content -->
			<div class="flex flex-col">
				<!-- Hero Title -->
				<h1 class="mb-4 text-4xl font-bold md:text-6xl">
					Effortless Dataset Creation Without Coding Hassles
				</h1>
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
</div>
