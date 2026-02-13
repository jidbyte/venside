<script lang="ts">
	import { cn } from '$lib/core/utils/common';
	import { Button as BitsButton, type ButtonRootProps } from 'bits-ui';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { Snippet } from 'svelte';

	const buttonVariants = cva(
		'inline-flex gap-1 items-center justify-center font-semibold p-2 rounded-md shadow-xs hover:shadow-sm transition-all active:scale-[0.98] aria-disabled:pointer-events-none disabled:opacity-60 disabled:pointer-events-none rounded-input',
		{
			variants: {
				variant: {
					default: 'bg-primary text-surface hover:bg-primary/80',
					secondary: 'bg-secondary text-ink hover:bg-secondary/80',
					neutral: 'bg-neutral text-ink hover:bg-neutral/80',
					focus: 'bg-ink/90 text-surface hover:bg-ink',
					ghost: 'bg-muted text-ink hover:text-gray-500 dark:hover:text-gray-200',
					link: 'bg-none shadow-none hover:shadow-none text-primary hover:underline underline-offset-3',
					outline: 'bg-none border hover:border-primary hover:text-primary',
					destructive: 'bg-red-500 text-white hover:bg-red-600'
				},
				size: {
					default: 'h-10 px-4 text-md',
					sm: 'h-9 px-3 text-sm',
					lg: 'h-11 px-6 text-md',
					icon: 'h-10 w-10'
				}
			},
			defaultVariants: {
				variant: 'default',
				size: 'default'
			}
		}
	);

	type ButtonProps = ButtonRootProps & {
		variant?: VariantProps<typeof buttonVariants>['variant'];
		size?: VariantProps<typeof buttonVariants>['size'];
		children: Snippet;
	};

	let {
		variant,
		size,
		class: className = '',
		children,
		ref = $bindable(null),
		...rest
	}: ButtonProps = $props();
</script>

<BitsButton.Root bind:ref class={cn(buttonVariants({ variant, size }), className)} {...rest}>
	{@render children()}
</BitsButton.Root>
