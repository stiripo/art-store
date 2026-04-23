import { render } from 'vitest-browser-react';
import { test, expect } from 'vitest';
import App from './App';
import { page } from 'vitest/browser';
import { MemoryRouter } from 'react-router-dom';
import { worker } from './mocks/browser';
import { beforeAll, afterEach, afterAll } from 'vitest';


beforeAll(() => worker.start())
afterEach(() => worker.resetHandlers())
afterAll(() => worker.stop())


test('render the gallery on /', async () => {
  await render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const gallery = page.getByText(/Gallery/i);
  await expect.element(gallery).toBeInTheDocument();

});


test('renders Collection on /collection', async () => {
  await render(
    <MemoryRouter initialEntries={['/collection']}>
      <App />
    </MemoryRouter>
  );

  const gallery = page.getByText(/Gallery/i);
  await expect.element(gallery).toBeInTheDocument();

  const title = page.getByText(/Actress/i);
  await expect.element(title).toBeInTheDocument();

  const images = page.getByRole('img');
  expect(images).not.toHaveLength(0);

});

test('renders Item on /collection/:id', async () => {
  await render(
    <MemoryRouter initialEntries={['/collection/2']}>
      <App />
    </MemoryRouter>
  );

  const images = page.getByRole('img');
  await expect.element(images).toBeInTheDocument();

});

test('clicking on an image leads to /collection/:id', async () => {
  await render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const image = page.getByRole('img', { name: 'Actress' });
  await expect.element(image).toBeInTheDocument();
  await image.click();
  await expect.element(page.getByRole('img')).toHaveLength(1);

});

test('renders Wishlist on /wishlist', async () => {
  await render(
    <MemoryRouter initialEntries={['/wishlist']}>
      <App />
    </MemoryRouter>
  );

  const wishlistHeading = page.getByRole('heading', { name: /Items on your wishlist/i });
  await expect.element(wishlistHeading).toBeInTheDocument();

});


test('clicking on the wishlist link leads to /wishlist', async () => {
  await render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const wishlistLink = page.getByRole('link', { name: /Wishlist/i });
  await expect.element(wishlistLink).toBeInTheDocument();
  await wishlistLink.click();
  const wishlistHeading = page.getByRole('heading', { name: /Items on your wishlist/i });
  await expect.element(wishlistHeading).toBeInTheDocument();

});

test('renders loading state when collection is loading', async () => {
  await render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const loadingIndicator = page.getByText(/Loading.../i);
  await expect.element(loadingIndicator).toBeInTheDocument();
});

test('adds item to wishlist when heart icon is clicked', async () => {
  await render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const heartButton = page.getByRole('button', { name: /Add to favorites/i }).first();
  await expect.element(heartButton).toBeInTheDocument();
  await heartButton.click();
  expect.poll(() => expect.element(heartButton).toHaveAttribute('aria-pressed', 'true'));
});