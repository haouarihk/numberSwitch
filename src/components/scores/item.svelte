<script lang="ts">
	import moment from 'moment';
	export let name: string | undefined = undefined;
	export let score: number | undefined = undefined;
	export let moves: number | undefined = undefined;
	export let spot: number | undefined = undefined;
</script>

<div id={'' + spot}>
	<div>
		{typeof spot === 'number' ? spot : 'Spot'}
	</div>
	<div>
		{typeof name === 'string' ? name : 'Name'}
	</div>
	<div>
		{typeof score === 'number' ? moment(score).format('mm:ss') : 'Score'}
	</div>
	<div>
		{typeof moves === 'number' ? moves : 'Moves'}
	</div>
</div>

<style>
	div {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}
</style>
