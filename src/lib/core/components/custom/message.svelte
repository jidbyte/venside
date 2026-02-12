<script lang="ts">
	import { cn } from '$lib/core/utils/common';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { Snippet } from 'svelte';
	import Icon from '@iconify/svelte';

	const messageVariants = cva(
		'flex items-start gap-2 font-medium rounded-md border p-2 text-sm shadow-xs',
		{
			variants: {
				variant: {
					success:
						'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-200',
					error:
						'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200',
					invalid: 'border-none p-0 text-red-500 dark:text-red-400 mt-1',
					warning:
						'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200',
					info: 'bg-sky-50 border-sky-200 text-sky-800 dark:bg-sky-950 dark:border-sky-800 dark:text-sky-200'
				}
			},
			defaultVariants: {
				variant: 'invalid'
			}
		}
	);

	const iconMap = {
		success: 'mdi:check-circle',
		error: 'mdi:alert-circle',
		invalid: 'mdi:alert-circle',
		warning: 'fa7-solid:warning',
		info: 'mdi:information'
	};

	type MessageProps = {
		variant?: VariantProps<typeof messageVariants>['variant'];
		class?: string;
		children: Snippet;
	};

	let { variant = 'invalid', class: className = '', children }: MessageProps = $props();
</script>

<div class={cn(messageVariants({ variant }), className)}>
	<Icon icon={iconMap[variant!]} class="mt-0.5 size-4 shrink-0" />
	<div class="flex-1">
		{@render children()}
	</div>
</div>
