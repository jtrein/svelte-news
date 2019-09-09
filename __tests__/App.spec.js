import { render, cleanup } from '@testing-library/svelte';
import App from '../src/App.svelte';
import {jsonResponse} from '../__fixtures__/fixtures';

beforeEach(() => {
  cleanup();

  const mockJsonPromise = Promise.resolve(jsonResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });

  global.fetch = jest.fn()
    .mockImplementationOnce(() => mockFetchPromise);
});

afterEach(() => {
  global.fetch.mockClear();
});

afterAll(() => {
  delete global.fetch;
});

describe('App', () => {
  test('should render Home page on mount', () => {
    const { getByPlaceholderText, getByText } = render(App)
    
    getByText(/latest news for/i);
    getByPlaceholderText(/search/i);
    getByText(/go/i);
    getByText(/getting the latest news/i);
  });
  
  test('should render a list of articles on mount', async () => {
    const { getByText } = render(App);

    await new Promise(r => setTimeout(r));

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/latest/gb');
    getByText(/another good one - sky news/i);
    getByText(/whoa nice one - bbc news/i);
  });
})
