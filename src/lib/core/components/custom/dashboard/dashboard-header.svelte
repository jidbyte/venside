<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageData } from '../../../../../routes/$types';
	import { Button } from '../../ui/button';
	import { Input } from '../../ui/input';
	import { Avatar } from '../../ui/avatar';
	import { sidebarState } from '$lib/core/context/sidebar.svelte';
	import { cn } from '$lib/core/utils/common';
	import { ThemeToggler } from '$lib/core/components/custom';

	let { data }: { data: PageData } = $props();

	const user = $derived(data?.user);
</script>

<!-- Large Screens Header -->
<header class="sticky top-0 z-30 hidden border-b border-muted bg-surface shadow-xs md:block">
	<div class="flex h-15 items-center justify-between gap-6 p-4 px-8">
		<!-- Search Input -->
		<div class="md:w-xs lg:w-sm">
			<Input type="search" icon="icon-park-outline:search" />
		</div>

		<!-- Action Buttons -->
		<div class="flex items-center justify-center gap-6">
			<Button variant="focus" size="sm">
				<Icon icon="bxs:plus-square" />
				<span>Quick Create</span>
			</Button>

			<div class="flex items-center justify-center gap-4">
				<span>
					<Icon icon="tabler:help-circle-filled" class="size-6 text-ink/80 hover:text-ink" />
				</span>
				<span>
					<Icon icon="famicons:notifications" class="size-6 text-ink/80 hover:text-ink" />
				</span>
				<span>
					<Icon icon="solar:settings-bold" class="size-6 text-ink/80 hover:text-ink" />
				</span>
			</div>

			<!-- User avatar -->
			<div class="flex items-center gap-2 rounded-full border border-neutral bg-muted p-1 pr-4">
				<Avatar fallback={user?.name} src={user?.image!} alt="User avatar" />
				<span class="text-sm font-medium">{user?.name}</span>
			</div>
		</div>
	</div>
</header>

<!-- Small Screens Header -->
<header class="sticky top-0 z-40 block border-b border-muted bg-surface shadow-xs md:hidden">
	<div class="flex h-15 items-center justify-between p-4">
		<!-- Logo-->
		<div
			class={cn(
				'inline-flex items-center gap-1 font-medium',
				sidebarState.isOpen ? 'text-2xl' : 'hidden'
			)}
		>
			<Icon icon="icon-park-twotone:paper-ship" />
			<span class="text-lg tracking-tight">Inventory</span>
		</div>

		<ThemeToggler />

		<div class="flex gap-4">
			<button>
				<Icon icon="bx:search" class="size-6 cursor-pointer hover:text-primary" />
			</button>
			<button>
				<Icon icon="ri:menu-3-line" class="size-6 cursor-pointer hover:text-primary" />
			</button>
		</div>
	</div>
</header>
