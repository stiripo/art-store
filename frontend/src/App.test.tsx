import { render } from 'vitest-browser-react';
import {test, expect} from 'vitest';
import App from './App';
import { page } from 'vitest/browser';

test('render the gallery on /', async () => {
  await render(<App />);
  const gallery = page.getByText(/Gallery/i);
  expect(gallery).toBeInTheDocument();
});
