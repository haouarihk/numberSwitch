<script lang="ts">
	import '../app.css';
</script>

<main>
	<slot />
</main>

<footer>
	<p>visit <a href="https://www.haouarihk.com">haouarihk.com</a></p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		height: full;
		max-width: 1024px;

		
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		main{margin: 0 auto;}
		footer {
			padding: 40px 0;
		}
	}
</style>
