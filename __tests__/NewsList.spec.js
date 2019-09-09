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

describe('NewsList', () => {
  test('should navigate to an article and back', async () => {
    const { getByText } = render(App)

    await new Promise(r => setTimeout(r));
    
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/latest/gb');
    getByText(/another good one - sky news/i);
    getByText(/whoa nice one - bbc news/i);
    
    fireEvent.click(getByText(/another good one - sky news/i))
    
    await waitForElement(() => getByText(/wow, this is a good article/i));
    
    fireEvent.click(getByText(/← news/i));
    
    await new Promise(r => setTimeout(r));

    getByText(/another good one - sky news/i);
    getByText(/whoa nice one - bbc news/i);
  });
})
