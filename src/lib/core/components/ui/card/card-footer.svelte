<script lang="ts">
	import { cn } from '$lib/core/utils/common';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<div class={cn('flex items-center p-4 pt-0 md:p-6', className)}>
	{@render children()}
</div>
