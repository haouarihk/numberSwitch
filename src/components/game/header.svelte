<script lang="ts">
	import moment from 'moment';
	import { turnDiffToNumber } from '../../utils';
	import { submitScore } from '../../utils/api';
	import Button from '../common/button.svelte';
	export let difficulty: string | number;
	export let restart: Function;
	export let win = false;
	export let numberOfMoves = 0;

	let time = 0;
	setInterval(() => {
		time += 1000;
	}, 1000);

	moment(time).format('mm:ss'); // '00:00'

	$: win === true &&
		(function onWin() {
			console.log('WON?');
			// if (name) saveScores(time, score, name);
			win = false;

			// submit highscore
			submitScore(
				localStorage.getItem('name') || 'guest',
				time,
				numberOfMoves,
				turnDiffToNumber(difficulty)
			);

			setTimeout(() => {
				time = 0;
				restart();
			}, 400);
		})();
</script>

<svelte:head>
	<title>Game {moment(time).format('mm:ss')}</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="header">
	<div class="score">
		time:
		<div class="score-number">{moment(time).format('mm:ss')}</div>
	</div>

	<!-- <div class="score">
		score:
		<div class="score-number">{score}</div>
	</div> -->

	<div class="controls">
		<Button
			onClick={() => {
				restart();
				time = 0;
			}}>restart</Button
		>
	</div>
</div>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
	}

	.controls {
		padding: 2rem;
	}

	.score {
		display: flex;
		/* justify-content: center; */
		align-items: center;
		gap: 1rem;
		font-size: 20px;
	}

	.score-number {
		font-size: 40px;
	}
</style>
