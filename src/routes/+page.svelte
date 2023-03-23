<script>
	import VisitorChart from './VisitorChart.svelte';

	const promise = (async () => {
		const response = await fetch('/api/visitlog');
		return await response.json();
	})();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>RisingStar app</h1>

	{#await promise}
		<p>Loading visit logs...</p>
	{:then visitlogs}
		<VisitorChart logs={visitlogs} />
	{/await}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
