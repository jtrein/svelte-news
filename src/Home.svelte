<script>
  import {searchText} from './store';
  import NewsList from './NewsList.svelte';
  import SearchInput from './SearchInput.svelte';
</script>

<h1>
  Latest News for{' '}
  <span aria-label="Flag of the United Kingdom" role="img">🇬🇧</span>
  <span class="visually-hidden"> the United Kingdom</span>
</h1>

<SearchInput />
<NewsList />
