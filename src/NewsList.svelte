<script>
  import { Link, navigate } from "svelte-routing";
  import {beforeUpdate, onMount} from 'svelte';
  import {articles, currentArticle, searchText} from './store';

  let fetchedArticles = [];
  let errorMessage = '';
  let searchValue = '';
  let searching = true;

  onMount(async () => {
    if (searchText && fetchedArticles.length) return;
    
    getArticles();
  });

  // subscribe to store changes of `searchText`
  searchText.subscribe(value => {
    getArticles(value);

    searchValue = value;
  });
  
  articles.subscribe(value => {
    fetchedArticles = value;
  });
  
  async function getArticles(search = '') {
    try {
      searching = true;

      const possibleSearchParam = search ? `?search=${encodeURIComponent(search.toLowerCase())}` : '';
      const response = await fetch(`http://localhost:3000/latest/gb${possibleSearchParam}`);
      const articlesJSON = await response.json();

      // set store value for `articles`
      articles.set(articlesJSON);
    } catch (error) {      
      if (error) {
        errorMessage = 'Something went awry while getting your news 😿.';
      }
    } finally {
      searching = false;
    }
  }

  function handleSetCurrentArticle(index) {
    return function () {
      const article = fetchedArticles[index - 1];

      // set `currentArticle` in store
      currentArticle.set({
        content: article.content,
        description: article.description,
        externalURL: article.url,
        image: article.urlToImage,
        sourceName: article.source.name,
        title: article.title,
      });

      navigate(`/${index}`);
    };
  }
</script>

{#if searching && !errorMessage}
  <p class="progress-text">Getting the latest news&hellip;</p>
{/if}

{#if !searching && !fetchedArticles.length}
  <p>No articles were found matching "{searchValue}"</p>
{/if}

{#if errorMessage}
  <p class="error__text">{errorMessage}</p>
{/if}

{#if fetchedArticles.length}
  <ul>
    {#each fetchedArticles as {description, publishedAt, title}, index}
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
