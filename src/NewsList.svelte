<script>
  import {Link, navigate} from "svelte-routing";
  import {onDestroy, onMount} from 'svelte';
  import {articles, currentArticle, searchText} from './store';

  const ERROR_GENERIC = 'Something went awry while getting your news 😿.';
  const serverURL = 'http://localhost:3000';
  let errorMessage = '';
  let searching = false;

  onMount(async () => {
    if ($searchText !== undefined) return;

    getArticles();
  });

  // subscribe to store changes of `searchText`
  const searchTextUnsubscribe = searchText.subscribe(value => {
    if ($searchText === undefined) return;

    getArticles(value);
  });
  
  async function getArticles(search = '') {
    try {
      searching = true;

      const possibleSearchParam = search ? `?search=${encodeURIComponent(search.toLowerCase())}` : '';
      const response = await fetch(`${serverURL}/latest/gb${possibleSearchParam}`);
      const responseJSON = await response.json();

      // fetch doesn't throw on request errors
      if (responseJSON.errorMessage) {
        throw responseJSON; 
      }

      // set store value for `articles`
      articles.set(responseJSON);
    } catch (error) {
      if (error) {
        errorMessage = ERROR_GENERIC;
        
        // should be logged somehow
        console.error(`Server:`, error.errorMessage || 'Something went wrong.');
      }
    } finally {
      searching = false;
    }
  }

  function handleSetCurrentArticle(index) {
    return function () {
      const article = $articles[index - 1];

      // set `currentArticle` in store
      currentArticle.set({
        content: article.content,
        description: article.description,
        externalURL: article.url,
        image: article.urlToImage,
        sourceName: article.source.name,
        title: article.title,
      });

      navigate(`${index}`);
    };
  }

  onDestroy(() => {
    searchTextUnsubscribe();
  });
</script>

{#if searching && !errorMessage}
  <p class="progress-text">Getting the latest news&hellip;</p>
{/if}

{#if $searchText && !searching && !$articles.length}
  <p>No articles were found matching "{$searchText}"</p>
{/if}

{#if errorMessage}
  <p class="error__text">{errorMessage}</p>
{/if}

{#if $articles.length}
  <ul>
    {#each $articles as {description, publishedAt, title}, index}
      <li class="article__row">
        <Link
          to={(index + 1).toString()}
          on:click={handleSetCurrentArticle(index + 1)}>
          {title}
        </Link>
      </li>
    {/each}
  </ul>
{/if}
