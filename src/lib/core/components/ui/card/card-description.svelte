<script lang="ts">
	import { cn } from '$lib/core/utils/common';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<p class={cn('mt-1 leading-tight tracking-tight text-ink/80', className)}>
	{@render children()}
</p>
