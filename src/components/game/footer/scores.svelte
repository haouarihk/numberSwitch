<script lang="ts">
	import { onChange, getHighScoreOf, getHighScore, getMySpot } from '../../../utils/api';
	import { turnDiffToNumber } from '../../../utils';
	import { onMount } from 'svelte';

	import moment from 'moment';

	export let difficulty: string | number;
	let highScore: number;
	let pb: number;
	let name: string;
	let spot: number | null;
	let spotString: string = '';

	const getHigh = async () => {
		name = localStorage.getItem('name') || 'Guest';

		highScore = await getHighScore(turnDiffToNumber(difficulty));
		pb = await getHighScoreOf(
			localStorage.getItem('name') || 'guest',
			turnDiffToNumber(difficulty)
		);

		spot = await getMySpot(localStorage.getItem('name') || 'guest', turnDiffToNumber(difficulty));
	};

	$: spot ||
		(() => {
			if (spot === null) return (spotString = '');
			if (spot > 3)
				switch (spot) {
					case 1:
						return (spotString = `(1st)`);
					case 2:
						return (spotString = `(2st)`);
					case 3:
						return (spotString = `(3st)`);
					default:
						return (spotString = `(${spot})`);
				}
		})();

	onMount(getHigh);
	onChange(getHigh);
</script>

<div class="kk">
	<div class="center">
		<span class="bold">{name}{spotString}</span>
	</div>
	<div>
		<div>
			PB: <span class="bold">{typeof pb == 'number' ? moment(pb).format('mm:ss') : 'none'}</span>
		</div>
		<div>
			high score: <span class="bold"
				>{typeof highScore == 'number' ? moment(highScore).format('mm:ss') : 'none'}</span
			>
		</div>
	</div>
</div>

<style>
	.center {
		text-align: center;
	}

	.kk {
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		align-items: center;
		gap: 10px;
	}
</style>
