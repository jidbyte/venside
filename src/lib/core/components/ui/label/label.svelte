<script lang="ts">
	import { cn } from '$lib/core/utils/common';
	import type { Snippet } from 'svelte';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	type LabelProps = HTMLLabelAttributes & {
		class?: string;
		children: Snippet;
	};

	let { class: className = '', children, ...rest }: LabelProps = $props();
</script>

<label
	class={cn(
		'mb-1.5 block text-sm leading-none font-medium tracking-wider text-ink/80 peer-disabled:cursor-not-allowed peer-disabled:opacity-60',
		className
	)}
	{...rest}
>
	{@render children()}
</label>
