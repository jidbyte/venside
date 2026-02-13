<script lang="ts">
	import { cn } from '$lib/core/utils/common';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<div class={cn('flex-1 bg-neutral/20 p-2 md:p-8', className)}>
	{@render children()}
</div>
