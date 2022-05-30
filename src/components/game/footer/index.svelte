<script lang="ts">
	import GameFooterScores from './scores.svelte';

	export let difficulty: string | number;
	export let numberOfMoves: number = 0;
	export let numberOfWins: number = 0;
	export let numberOfTries: number = 0;
</script>

<div style="display:flex;justify-content:space-between;align-items: center;">
	<div style="display:flex;flex-direction: column; justify-content: center; ">
		<div>Difficulty</div>
		<div class="bold">{difficulty}</div>
	</div>

	<GameFooterScores {difficulty} />

	<div>
		<div>moves: <span class="bold">{numberOfMoves}</span></div>

		<div>wins: <span class="bold">{numberOfWins}</span></div>
		<div>tries: <span class="bold">{numberOfTries}</span></div>
	</div>
</div>

<style>
	.bold {
		font-weight: bold;
	}
</style>
