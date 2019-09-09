import {writable} from 'svelte/store';

export const articles = writable([]);

export const currentArticle = writable({
  content: '',
  description: '',
  externalURL: '',
  image: '',
  sourceName: '',
  title: '',
});

export const searchText = writable('');
