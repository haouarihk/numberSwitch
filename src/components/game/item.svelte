<script lang="ts">
	export let name: any;
	export let clickable = false;
	export let x: number = 0;
	export let y: number = 0;
	export let onClick: (x: number, y: number) => void;
	export let getDirection: (x: number, y: number) => 'down' | 'up' | 'right' | 'left' | undefined;

	let elementClass = '';
	function onClicked() {
		if (clickable) {
			elementClass = `move-${getDirection(x, y)}`;
			setTimeout(() => {
				elementClass = '';
				onClick(x, y);
			}, 140);
		}
	}
</script>

<div class="body {name && 'filled'} {clickable && 'clickable'} {elementClass}" on:click={onClicked}>
	{name ? name : ''}
</div>

<slot />

<style scoped>
	.body {
		color: var(--text-color);
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 40px;
		padding: 2rem;
		transition: all 0.2s ease-in-out;
	}

	.filled {
		background: var(--primary-color);
	}

	.clickable {
		cursor: pointer;
		/* outline: 0.1rem solid pink; */
		/* font-size: 55px; */
		/* transition: all 0.2s ease-in-out; */
	}

	.clickable:hover {
		background: var(--secondary-color);
	}

	.move-up {
		transform: translateY(-100%);
	}

	.move-down {
		transform: translateY(100%);
	}

	.move-left {
		transform: translateX(-100%);
	}

	.move-right {
		transform: translateX(100%);
	}
</style>
