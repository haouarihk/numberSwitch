<script lang="typescript">
	import Button from '../components/common/button.svelte';
	import { onMount } from 'svelte';
	let name = 'guest';
	let diff = 3;
	onMount(() => {
		name = localStorage.getItem('name') || name;
		diff = Number(localStorage.getItem('diff')) || diff;
	});
</script>

<main style="display:flex;flex-direction: column;gap:20px;">
	<div class="head">
		Welcome to <div class="diff">NumbersSwitch!</div>
	</div>

	Difficulty:<input type="number" bind:value={diff} />

	Name: <input type="text" bind:value={name} />

	<div class="menu">
		<a href="/game?d={diff}" class="btn">
			<Button
				onClick={() => {
					localStorage.setItem('name', name);
				}}>Start new game</Button
			>
		</a>

		<a href="/scores" class="btn"><Button>Check scores</Button></a>
	</div>
</main>

<style>
	input {
		text-align: center;
	}
	.head {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
		font-size: 40px;
	}

	.diff {
		color: red;
	}

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	.btn {
		text-decoration: none;
		color: var(--text-color);
	}

	.menu {
		display: flex;
		flex-direction: column;
		justify-content: center;

		font-size: 1.3rem;
		gap: 20px;
		padding-top: 40px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
