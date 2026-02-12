<script lang="ts">
	import { cn } from '$lib/core/utils/common';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<h3 class={cn('text-2xl leading-none font-semibold tracking-tight text-ink', className)}>
	{@render children()}
</h3>
