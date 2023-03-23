<script lang="ts">
	import 'chartjs-adapter-date-fns';

	import type { VisitLog } from '@prisma/client';

	export let logs: VisitLog[];
	const scatterData = logs.map((log) => {
		return {
			x: log.createdAt,
			y: log.id
		};
	});

	const trendData = logs
		.map((log) => {
			return {
				x: log.createdAt,
				y: log.id
			};
		})
		.filter((_, i) => i % 10 === 0 || i === logs.length - 1);

	import Chart from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	import { onMount } from 'svelte';

	let chartCanvas: HTMLCanvasElement;

	onMount(() => {
		new Chart(chartCanvas, {
			data: {
				datasets: [
					{
						type: 'scatter',
						label: 'Visitor count',
						data: scatterData,
					},
					{
						type: 'line',
						label: 'Trend',
						data: trendData,
						tension: 0.4
					}
				]
			},
			options: {
				scales: {
					x: {
						type: 'time'
					}
				}
			}
		});
	});
</script>

<canvas bind:this={chartCanvas} id="myChart" />
