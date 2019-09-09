import { render, cleanup, fireEvent, waitForElement } from '@testing-library/svelte';
import App from '../src/App.svelte';
import {jsonResponse} from '../__fixtures__/fixtures';

/**
 * CAN ONLY RUN AS INTEGRATION FOR NOW
 * AS A WRAPPING <Router /> IS NEEDED.
 */

beforeEach(() => {
  cleanup();
  
  const mockJsonPromise = Promise.resolve(jsonResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });

  global.fetch = jest.fn()
    .mockImplementationOnce(() => mockFetchPromise)
    .mockImplementationOnce(() => mockFetchPromise);
});

afterEach(() => {
  global.fetch.mockClear();
});

afterAll(() => {
  delete global.fetch;
});

describe('Article', () => {
  test('should render an article', async () => {
    const { getByAltText, getByText } = render(App)

    await new Promise(r => setTimeout(r));
    
    fireEvent.click(getByText(/whoa nice one - bbc news/i))
    await waitForElement(() => getByText(/wow, this is another great article/i));
    
    getByText(/← news/i);
    getByText(/whoa nice one - bbc news/i);
    getByAltText(/image for the article \"whoa nice one - bbc news\"/i);
    getByText(/view article at bbc\.com/i);
  })
})
