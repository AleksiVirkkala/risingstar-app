<script>
	import Counter from './Counter.svelte';

	
	const promise = (async () => {
		const response = await fetch('/api/visitlog');
		return await response.json();
	})();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#await promise}
<p>
	Loading visit logs...
</p>
{:then visitlogs}
{#each visitlogs as log }
<div>
	{log}
</div> 
{/each}
{/await}

<section>
	<h1>
		Welcome to your new<br />RisingStar app !!!
	</h1>

	<Counter />
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
