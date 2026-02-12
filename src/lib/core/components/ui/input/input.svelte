<script lang="ts">
	import { cn } from '$lib/core/utils/common';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Icon from '@iconify/svelte';
	import type { IconifyIcon } from '@iconify/svelte';

	type InputProps = HTMLInputAttributes & {
		ref?: HTMLInputElement | null;
		icon?: IconifyIcon | string;
		iconClass?: string;
	};

	let {
		ref = $bindable(null),
		value = $bindable(),
		type = 'text',
		class: className = '',
		icon,
		iconClass = '',
		...rest
	}: InputProps = $props();

	let hasIcon = $derived(!!icon);
	let paddingClass = $derived(hasIcon ? 'pl-8' : '');
</script>

<div class="relative">
	{#if hasIcon && icon}
		<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
			<Icon {icon} class={cn('mt-0.5 size-4 text-ink/80', iconClass)} />
		</div>
	{/if}

	<input
		bind:this={ref}
		bind:value
		{type}
		class={cn(
			'flex h-10 w-full rounded border bg-muted p-2 text-base text-ink/90 shadow-xs transition-all outline-none',
			paddingClass,
			'placeholder:text-ink/50',
			'focus-visible:border-ring focus-visible:bg-none focus-visible:ring-[1.5px] focus-visible:ring-primary/90',
			'disabled:cursor-not-allowed disabled:opacity-60',
			'aria-invalid:border-red-500 aria-invalid:ring-red-500',
			className
		)}
		{...rest}
	/>
</div>
