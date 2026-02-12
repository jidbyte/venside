<script lang="ts">
	let { children, data } = $props();
</script>

<main class="flex-1 p-4 md:p-8">
	{@render children()}
</main>
