import { render } from 'vitest-browser-react';
import {test, expect} from 'vitest';
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
  expect(images).toHaveLength(1);

});

test('clicking on an image leads to /collection/:id', async () => {
  await render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const image = page.getByRole('img', {name: 'Actress'});
  await expect.element(image).toBeInTheDocument();
  await image.click();

  await expect(page.getByRole('img')).toHaveLength(1);
})
