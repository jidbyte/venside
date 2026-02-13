<script lang="ts">
	import {
		DashboardHeader,
		DashboardContent,
		DashboardSidebar
	} from '$lib/core/components/custom/dashboard';
	import { sidebarState } from '$lib/core/context/sidebar.svelte';

	let { children, data } = $props();
</script>

<div class="flex min-h-screen">
	<DashboardSidebar />

	<div
		class="flex flex-1 flex-col transition-all duration-300 ease-in-out"
		class:md:ml-56={sidebarState.isOpen}
		class:md:ml-16={!sidebarState.isOpen}
	>
		<DashboardHeader {data} />

		<DashboardContent>
			<main class="min-h-[84vh] rounded-md bg-surface p-4 shadow-sm lg:p-6">
				{@render children()}
			</main>
		</DashboardContent>
	</div>
</div>
