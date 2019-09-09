<script>
  import {beforeUpdate, onMount} from 'svelte';
  import {searchText} from './store';

  let newsList = [];
  let errorMessage = '';
  let searchValue = '';
  let searching = true;

  // subscribe to store changes of `searchText`
  searchText.subscribe(value => {
    getNewsList(value);

    searchValue = value;
  });
  
  async function getNewsList(search = '') {
    try {
      searching = true;

      const possibleSearchParam = search ? `?search=${encodeURIComponent(search.toLowerCase())}` : '';
      const response = await fetch(`http://localhost:3000/latest/gb${possibleSearchParam}`);
      const articles = await response.json();

      newsList = articles;
    } catch (error) {      
      if (error) {
        errorMessage = 'Something went awry while getting your news 😿.';
      }
    } finally {
      searching = false;
    }
  }  

  onMount(async () => {
    getNewsList();
  });
</script>

{#if searching && !errorMessage}
  <p class="progress-text">Getting the latest news&hellip;</p>
{/if}

{#if !searching && !newsList.length}
  <p>No articles were found matching "{searchValue}"</p>
{/if}

{#if errorMessage}
  <p class="error__text">{errorMessage}</p>
{/if}

{#if newsList.length}
  <ul>
    {#each newsList as {description, publishedAt, title}}
      <li class="newslist__row">{title}</li>
    {/each}
  </ul>
{/if}
