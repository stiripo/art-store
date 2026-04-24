Art Store

A full-stack gallery app showcasing my digital paintings.

Tech Stack:
Frontend: React, TypeScript, Vite
Backend: Node.js, Express.js
Database: PostgreSQL (via pg-promise)
Testing: Vitest + vitest-browser-react


Features

Gallery & Filtering
Artworks are fetched from a REST API and displayed in a responsive grid. A radio-based filter lets users browse by category, with the filtered count updated live via an ARIA live region.

Favorites / Wishlist
Users can heart any artwork from the gallery or detail view to add it to a wishlist. Favorites persist across sessions using localStorage. The wishlist is its own route with a dedicated page.

Item Detail View
Clicking an artwork navigates to a dedicated page (/collection/:id) that fetches the individual item from the API and displays full details.

Routing
Client-side routing with React Router. Routes: /, /collection, /wishlist, /collection/:id.

State Management
This project was my first hands-on experience with the Context API. State is split into two providers:
CollectionProvider — fetches and caches the full collection from the backend, shared across all pages to avoid redundant requests.
FavoritesProvider — manages the Set<number> of favorited IDs, syncs to localStorage, and exposes a toggleFavorites action.
Both are consumed via custom hooks (useCollection, useFavorites) rather than calling useContext directly in components.

Performance

Images use srcset with multiple .webp sizes (160w / 300w / 600w) and sizes for responsive loading
Above-the-fold images use loading="eager" + fetchPriority="high"; the rest are lazy-loaded
The FilterForm component is wrapped in React.memo to skip re-renders when collection data updates
Filtered/sorted values are derived with useMemo
Route components are code-split using React.lazy + Suspense

Accessibility

Filter inputs use a proper <fieldset> / <legend> / radio group
Favorite buttons have aria-pressed state and descriptive aria-labels
Dynamic content updates (item count, wishlist changes) use aria-live="polite"
All images have meaningful alt text


Backend
A lightweight Express server exposes a REST API for the collection:
GET/collection - Fetch all artworks
GET/collection/:id - Fetch single artwork
POST/collection - Add new artwork
PATCH/collection/:id - Update artwork
DELETE/collection/:id - Delete artwork
PostgreSQL is connected via pg-promise.

Testing
Browser-mode tests with Vitest and vitest-browser-react.
API calls are intercepted with MSW (Mock Service Worker) via a browser worker.

