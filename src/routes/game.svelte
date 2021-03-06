<!-- just to retrive query parameters -->
<script context="module" lang="ts">
	export function load({ url }: any) {
		const k = (b: string | number) => {
			if (typeof Number(b) === 'number') return Number(b);
			return b;
		};
		const difficulty = k(url.searchParams.get('d') || url.searchParams.get('difficulty')) || 'easy';
		return {
			props: {
				difficulty
			}
		};
	}
</script>

<script lang="ts">
	import { Grid } from '../utils/grid';
	import { turnDiffToNumber } from '../utils';

	import GameHeader from '../components/game/header.svelte';
	import GameFooter from '../components/game/footer/index.svelte';
	import GameItem from '../components/game/item.svelte';

	export let difficulty: string | number;

	let numberOfTries = 0;
	let numberOfWins = 0;

	let numberOfMoves = 0;

	const myGrid = new Grid([1, 2, 3, 4, 5, 6, 7, 8]);

	myGrid.randomize(turnDiffToNumber(difficulty));
	let win: boolean = false;

	// restarts when the user requests
	function restart() {
		numberOfMoves = 0;
		numberOfTries++;
		console.log('reorder');
		myGrid.randomize(turnDiffToNumber(difficulty));
		myGrid.grid = [...myGrid.grid];
	}

	// check the order and also updates the grid
	function update() {
		myGrid.grid = [...myGrid.grid];
		// check the order
		if (!win && myGrid.checkOrder()) {
			numberOfWins++;
			win = true;
		}
	}

	function onClick(x: number, y: number) {
		myGrid.move({ x, y });
		numberOfMoves++;
		update();
	}
</script>

<div class="bd">
	<GameHeader bind:win {restart} {difficulty} {numberOfMoves} />

	<div class="items-body">
		{#if myGrid.grid.length}
			{#each myGrid.grid as rows, x}
				{#each rows as name, y}
					{#key name}
						<GameItem
							getDirection={myGrid.getMovementDirectionFromPoint.bind(myGrid)}
							{x}
							{y}
							{name}
							{onClick}
							clickable={myGrid.isAvailableMove(x, y)}
						/>
					{/key}
				{/each}
			{/each}
		{/if}
	</div>

	<GameFooter {numberOfMoves} {numberOfTries} {numberOfWins} {difficulty} />
</div>

<style>
	* {
		transition: all 0.2s ease-in-out;
	}

	.bd {
		user-select: none;
		display: flex;
		flex-wrap: wrap;
		flex-flow: column;
		justify-content: center;
		margin: 0 auto;
		height: 90vh;
		padding: 2rem;
		gap: 1.2rem;
		max-width: 30rem;
		max-height: 30rem;
	}

	.items-body {
		display: inline-grid;
		grid-template-columns: auto auto auto;
		height: 100%;
		padding: 10px;
		gap: 1.2rem;
	}

	@media (max-width: 600px) {
		.items-body {
			gap: 1rem;
			padding: 5px;
		}
		.bd {
			gap: 2rem;
		}
	}
</style>
