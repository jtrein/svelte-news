<script>
  import {Route, Router} from 'svelte-routing'
  import Article from './Article.svelte';
  import Home from './Home.svelte';
</script>

<Router url="">
  <div class="app-container">
    <Route path=":articleID">
      <Article />
    </Route>
    <Route path="/">
      <Home />
    </Route>
  </div>
</Router>
