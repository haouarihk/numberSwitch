<script lang="ts">
	export let onClick: Function = () => {};
	export let disabled: boolean = false;
</script>

<div class="body {disabled && 'disabled'}" on:click={() => onClick()}>
	<div class="content-body"><slot /></div>
</div>

<style scoped>
	.body {
		background: var(--primary-color);
		user-select: none;
		cursor: pointer;
		border-radius: 10px;
		padding: 0 auto;
		font-size: 20px;
		padding: 10px;
		transition: all 0.2s ease-in-out;
		height: 100%;
		width: 100%;
	}

	.disabled,
	.disabled:hover,
	.disabled:active {
		background: var(--disabled-color);
		cursor: auto;
	}

	.body:hover {
		background: var(--secondary-color);
	}

	.body:active {
		background: #e0e0e0;
	}
</style>
