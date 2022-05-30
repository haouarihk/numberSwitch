<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '../components/common/button.svelte';
	import { getLeaderBoard, onChange, getEachLeaderBoardSize } from '../utils/api';
	import ScoreItem from '../components/scores/item.svelte';

	let items: {
		score: number;
		moves: number;
		date: number;
		name: string;
	}[] = [];

	let sizes: { diff: number; length: number }[] = [];
	let selectedSize = 1;

	let showOnlyHighScores = false;
	async function getIt(showOnlyHighScores: boolean = false) {
		items = [...(await getLeaderBoard(selectedSize, showOnlyHighScores))];

		sizes = [...(await getEachLeaderBoardSize(showOnlyHighScores))];
		console.log({ items, sizes });
	}

	onMount(() => {
		getIt();
		console.log('mounted');
	});
	onChange(() => getIt());

	function onCheckChanged(e: any) {
		getIt(e?.target?.checked || false);
	}
</script>

<h1>Scores</h1>
<div>
	<div>
		Show Only HighScores: <input
			type="checkbox"
			bind:checked={showOnlyHighScores}
			on:change={onCheckChanged}
		/>
	</div>
	<div class="display-sizes">
		Difficulty:
		{#each sizes as size}
			<div class="btn">
				<Button
					disabled={selectedSize === size.diff}
					onClick={() => {
						selectedSize = size.diff;
						getIt(showOnlyHighScores);
					}}>{size.diff}({size.length})</Button
				>
			</div>
		{/each}
	</div>
</div>
<div class="menu">
	<ScoreItem />
	{#each items as item, i}
		<ScoreItem spot={i + 1} {...item || {}} />
	{/each}
</div>

<style scoped>
	.display-sizes {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
		padding: 10px;
	}

	.btn {
		overflow: hidden;
	}

	.menu {
		background: var(--almost-black);
		display: flex;
		flex-direction: column;
		padding: 2rem;
		font-size: 1.3rem;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>
