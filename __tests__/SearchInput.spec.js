import { render, cleanup, fireEvent, waitForElement } from '@testing-library/svelte';
import App from '../src/App.svelte';
import SearchInput from '../src/SearchInput.svelte';
import {jsonResponse} from '../__fixtures__/fixtures';
import { debug } from 'svelte/internal';

beforeEach(() => {
  cleanup();

  // Search promises
  const searchJsonPromise = Promise.resolve([jsonResponse[1]]);
  const searchFetchPromise = Promise.resolve({
    json: () => searchJsonPromise,
  });

  global.fetch = jest.fn()
    .mockImplementationOnce(() => searchFetchPromise)
    .mockImplementationOnce(() => searchFetchPromise);
});

afterEach(() => {
  global.fetch.mockClear();
});

afterAll(() => {
  delete global.fetch;
});

describe('SearchInput', () => {
  test('should render search components', () => {
    const { getByPlaceholderText, getByText } = render(SearchInput)
    
    getByText(/search articles/i);
    getByPlaceholderText(/search/i);
    getByText(/go/i);
  });

  test('should search for a keyword', async () => {
    const { debug, getByPlaceholderText, getByText } = render(App)    
    const input = getByPlaceholderText(/search/i);
    
    fireEvent.focus(input);
    fireEvent.input(
      input,
      {target: {value: 'bbc'}}
    );
    fireEvent.blur(input);
    fireEvent.click(getByText(/go/i));
    
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/latest/gb?search=bbc');
    
    await new Promise(r => setTimeout(r, 100));

    getByText(/whoa nice one - bbc news/i);

    expect(() => getByText(/another good one - sky news/i)).toThrow();
  });
});
