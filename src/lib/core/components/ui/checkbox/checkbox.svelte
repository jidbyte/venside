<script lang="ts">
	import { cn } from '$lib/core/utils/common';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { Check } from '@lucide/svelte/icons';

	type CheckboxProps = Omit<HTMLInputAttributes, 'type'> & {
		ref?: HTMLInputElement | null;
		checked?: boolean;
	};

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		class: className = '',
		...rest
	}: CheckboxProps = $props();
</script>

<div class="relative inline-flex items-center justify-center">
	<input
		bind:this={ref}
		bind:checked
		type="checkbox"
		class={cn(
			'peer h-4 w-4 shrink-0 cursor-pointer rounded bg-muted shadow-xs transition-all',
			'appearance-none border-2 border-ink/50 ring-0 outline-none',
			'checked:border checked:bg-secondary checked:ring-0',
			'disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-destructive',
			className
		)}
		{...rest}
	/>
	{#if checked}
		<Check class="pointer-events-none absolute inset-0 m-auto size-3 font-bold text-ink" />
	{/if}
</div>
