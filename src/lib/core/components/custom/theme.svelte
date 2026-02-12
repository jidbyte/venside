<script lang="ts">
	import Icon from '@iconify/svelte';
	import { mode, setMode } from 'mode-watcher';
	import { fly } from 'svelte/transition';

	const options = [
		{ value: 'light', icon: 'lucide:sun' },
		{ value: 'dark', icon: 'lucide:moon' }
	] as const;

	function handleModeChange(newMode: 'light' | 'dark') {
		setMode(newMode);

		// Sync with DaisyUI's data-theme attribute
		if (typeof document !== 'undefined') {
			const theme = newMode === 'dark' ? 'night' : 'winter';
			document.documentElement.setAttribute('data-theme', theme);
		}
	}

	// Initialize theme on mount
	$effect(() => {
		if (typeof document !== 'undefined') {
			const theme = mode.current === 'dark' ? 'night' : 'winter';
			document.documentElement.setAttribute('data-theme', theme);
		}
	});
</script>

<div class="flex items-center gap-2 rounded-full border p-1 backdrop-blur-md">
	{#each options as option}
		<button
			onclick={() => handleModeChange(option.value)}
			class="relative flex items-center justify-center rounded-full p-2 text-sm transition-colors duration-300 hover:text-sky-400
			{mode.current === option.value ? 'font-semibold' : 'text-gray-400'}"
			aria-label="Set {option.value} mode"
		>
			{#if mode.current === option.value}
				<div
					in:fly={{ y: 2, duration: 300 }}
					class="border-border absolute inset-0 -z-10 rounded-full border shadow-sm"
				></div>
			{/if}

			<Icon icon={option.icon} class="size-4" />
		</button>
	{/each}
</div>
