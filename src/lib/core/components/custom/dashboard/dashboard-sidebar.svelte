<script lang="ts">
	import { page } from '$app/state';
	import { sidebarState } from '$lib/core/context/sidebar.svelte';
	import { cn, Router } from '$lib/core/utils/common';
	import Icon from '@iconify/svelte';
	import { PanelRightClose, PanelRightOpen } from '@lucide/svelte';
	import { slide } from 'svelte/transition';
	import { Button } from '../../ui/button';
	import { SignOutClient } from '$lib/modules/auth/client';

	const routes = [
		{ name: 'Overview', icon: 'solar:widget-5-bold', path: '/overview' },
		{ name: 'Products', icon: 'solar:box-minimalistic-bold', path: '/products' },
		{ name: 'Sales', icon: 'solar:dollar-bold', path: '/sales' },
		{ name: 'Purchases', icon: 'solar:cart-bold', path: '/purchases' },
		{ name: 'Customers', icon: 'solar:user-bold', path: '/customers' },
		{ name: 'Vendors', icon: 'solar:suitcase-tag-bold', path: '/vendors' },
		{ name: 'Analytics', icon: 'solar:chart-bold', path: '/analytics' }
	];

	let pathname = $derived(page.url.pathname);
</script>

<aside
	class={cn(
		'fixed top-0 left-0 z-40 hidden border-r border-muted shadow-xs transition-all duration-300 md:block',
		sidebarState.isOpen ? 'w-56' : 'w-16'
	)}
>
	<div class="flex h-screen flex-col items-start justify-between">
		<div class="w-full">
			<!-- Sidebar Header -->
			<header
				class="flex h-15 items-center justify-between border-b border-muted p-4 transition-all duration-300"
			>
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

				<button onclick={() => sidebarState.toggle()}>
					{#if sidebarState.isOpen}
						<PanelRightOpen class="size-5 text-ink/60 hover:text-ink" />
					{:else}
						<PanelRightClose class="size-5 text-ink/60 hover:text-ink" />
					{/if}
				</button>
			</header>

			<!-- Sidebar Navigation -->
			<nav class="w-full flex-1 overflow-y-auto px-2 py-10">
				<ul class={cn('space-y-1', !sidebarState.isOpen && 'grid place-content-center')}>
					{#each routes as route}
						<li>
							<button
								onclick={() => Router(route.path)}
								class={cn(
									'inline-flex w-full items-center gap-2 p-2 text-ink/70 transition-colors duration-200 hover:text-ink',
									pathname === route.path && 'rounded bg-neutral/20 font-medium text-ink'
								)}
							>
								<Icon icon={route.icon} class={sidebarState.isOpen ? 'size-4.5' : 'size-6'} />
								{#if sidebarState.isOpen}
									<span
										in:slide={{ duration: 250, axis: 'x' }}
										out:slide={{ duration: 200, axis: 'x' }}
									>
										{route.name}
									</span>
								{/if}
							</button>
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<!-- Sidebar Footer -->
		<footer class="w-full p-4">
			<Button
				onclick={SignOutClient}
				class="inline-flex w-full items-center gap-2"
				variant="outline"
			>
				<Icon icon="solar:logout-2-outline" />
				<span class:hidden={!sidebarState.isOpen}>Sign out</span>
			</Button>
		</footer>
	</div>
</aside>
