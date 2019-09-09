<script>
  import {onMount} from 'svelte';
  import {Link, navigate} from 'svelte-routing'
  import {currentArticle} from './store';
  
  let article;

  onMount(() => {
    if (!article.title) navigate('/');
  });

  // subscribe to changes to `currentArticle` from store
  currentArticle.subscribe(value => (article = value));
</script>

<Link
  to="/"
  getProps={() => ({class: "link--border"})}>
  &larr; News
</Link>

<h1>{article.title}</h1>

<img alt={`Image for the article "${article.title}"`} src={article.image} />

<p class="text">
  <!-- remove [+ ...] from end of content -->
  {
    (article.content && article.content.split(/\[\+/)[0])
    || article.description
    || ''
  } 
</p>

<a
  href={article.externalURL}
  noopener
  noreferrer
  target="_blank">
  View article at {article.sourceName}
</a>
