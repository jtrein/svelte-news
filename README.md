# Latest News - U.K. Edition

A fun little app built in Svelte! See the latest UK news, and search by keyword. Click on any article to see more details, like a pretty image 🌈, a snippet, and a link to the source.

### Running the app locally

```
git clone git@github.com:jtrein/svelte-news.git
cd svelte-news/server
npm i
cd ../
npm i
npm start
```

### Technologies used

* Front-end: `svelte`, `svelte-routing`
* Back-end: `node`, `express`
* Testing: `testing-library/svelte`

### Running tests

```
npm test
```

### How the app works

The app is divided into components, but the workhorse is `NewsList.svelte`.

1. On mount the app calls the server to request ~20 articles
2. Routing is decided within the client (no SSR). There are 2 paths:
    - Home
    - An arbitrary article page (e.g. /17). That I could see, there isn't a clean, predictable way to get a unique page slug with the data we are given.
3. When going back to the Home page from an article, cached data is shown while new data is fetched in the background.
4. Searching is by keywords and can be done by pressing "Go" or the `Enter` key. 
5. Search input is remembered if a value is set.

### Some future things which could improve the app

* Load more, and more, and more articles!
* Images are high res causing a bit of jumpy page on load, so we'd need to first load a smaller one somehow, or add a nice placeholder.
* Server-side rendering would be fun.
* `Article` could most likely utilise props being passed in, instead of using the store, but I had some fun playing with the store.
* `server` could add headers and more precise error handling (e.g. responding to rate limiting on News API).
* More tests, of course!
