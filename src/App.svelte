<script>
  import NewsList from './NewsList.svelte';
</script>

<style>
  h1 {
    color: #333;
  }
</style>

<h1>
  Latest News for{' '}
  <span aria-label="Flag of the United Kingdom" role="img">🇬🇧</span>
  <span class="visually-hidden"> the United Kingdom</span>
</h1>

<NewsList />
