<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from 'svelte-sonner';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div>
	<Toaster richColors position="top-center" />
	<ModeWatcher defaultMode="dark" />

	{@render children()}
</div>
