<script lang="ts">
	import { cn } from '$lib/core/utils/common';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<div class={cn('rounded-lg border border-neutral bg-none shadow-xs', className)}>
	{@render children()}
</div>
