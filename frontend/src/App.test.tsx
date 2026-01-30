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
    <MemoryRouter initialEntries={['/collection/1']}>
      <App />
    </MemoryRouter>
  );

  const images = page.getByRole('img');
  expect(images).toHaveLength(1);
});

// test('navigates to an item when clicking on the link', async () => {
//   await render(
//      <MemoryRouter initialEntries={['/collection']}>
//       <App />
//     </MemoryRouter>
//   );

  

// const images = page.getByRole('img');
// expect(images).toHaveLength(10);

  // const link = page.getByRole('link', { name: 'Northern Lights'});
  // expect(link).toBeInTheDocument();
  // await link.click();

  // const item = page.getByRole('img');
  // expect(item).toHaveLength(1);

// })