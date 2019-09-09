<script>
  import {searchText} from './store';

  let searchValue = '';

  searchText.subscribe(value => {
    searchValue = value;
  });

  function handleEnter(event) {
    if (event.code === 'Enter') {
      handleSearch(searchValue);
    }
  }

  function handleSearch() {
    // update the store
    searchText.set(searchValue);
  }

  function handleValueChange(event) {
    searchValue = event.target.value;
  }
</script>

<label>
  <span class="visually-hidden">Search articles</span>
  <input
    placeholder="Search"
    on:keydown={handleEnter}
    on:input={handleValueChange}
    type="text"
    value={searchValue} />
  <button on:click={handleSearch}>Go</button>
</label>
