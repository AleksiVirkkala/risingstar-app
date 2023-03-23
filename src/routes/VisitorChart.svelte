<script lang="ts">
	import 'chartjs-adapter-date-fns';

	import type { VisitLog } from '@prisma/client';

	export let logs: VisitLog[];
	const scatterData = logs.map((log) => {
		return {
			x: log.createdAt,
			y: log.id,
			meta: log
		};
	});

	const datasetsByBrowser = separateDataArray(scatterData);
	const trendData = scatterData.filter((_, i) => i % 10 === 0 || i === logs.length - 1);

	import Chart from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	import { onMount } from 'svelte';
	import { separateDataArray } from '$lib/utils';

	let chartCanvas: HTMLCanvasElement;

	onMount(() => {
		new Chart(chartCanvas, {
			data: {
				datasets: [
					...datasetsByBrowser,
					{
						type: 'line',
						label: 'Trend',
						data: trendData,
						tension: 0.4,
						borderDash: [5, 5],
						pointRadius: 0,
						pointHitRadius: 0
					}
				]
			},
			options: {
				scales: {
					x: {
						type: 'time'
					}
				},
				plugins: {
					tooltip: {
						callbacks: {
							title: (context) => {
								return `Visit #${context[0].parsed.y}`;
							},
							label: (context) => {
								//const log = context.parsed.meta as VisitLog;
								const meta = (context.raw as any).meta as VisitLog;
								const { browser, mobile, os, version } = meta;
								return [
									`Browser: ${browser}`,
									`Version: ${version}`,
									`OS: ${os}`,
									`Mobile: ${mobile}`
								];
							}
						}
					},
					title: {
						text: 'Visit history',
						font: {
							size: 20,
							weight: 'lighter'
						},
						display: true
					}
				}
			}
		});
	});
</script>

<canvas bind:this={chartCanvas} id="myChart" />
