CREATE TABLE IF NOT EXISTS art_items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  medium VARCHAR(255),
  image_url TEXT,
  price DECIMAL,
  status VARCHAR(50),
  category VARCHAR(100),
);

INSERT INTO art_items (title, medium, image_url, price, status, category)
VALUES

  ('Poppies', 'digital', 'http://localhost:8080/images/medium/Poppies', 5.00, 'In stock', 'Landscape'),
  ('Northern Lights', 'digital', 'http://localhost:8080/images/medium/Northern_Lights', 0.00, 'In stock', 'Landscape'),
  ('Actress', 'digital', 'http://localhost:8080/images/medium/Actress', 0.00, 'In stock', 'Portrait'),
  ('Cello Player', 'digital', 'http://localhost:8080/images/medium/Cello_Player', 0.00, 'In stock', 'Portrait'),
  ('Cowboy', 'digital', 'http://localhost:8080/images/medium/Cowboy', 0.00, 'In stock', 'Portrait'),
  ('Johnny', 'digital', 'http://localhost:8080/images/medium/Johnny', 0.00, 'In stock', 'Portrait'),
  ('Live Performance', 'digital', 'http://localhost:8080/images/medium/Live_Performance', 0.00, 'In stock', 'Portrait'),
  ('Marilyn', 'digital', 'http://localhost:8080/images/medium/Marilyn', 0.00, 'In stock', 'Portrait'),
  ('Nuno', 'digital', 'http://localhost:8080/images/medium/Nuno', 0.00, 'In stock', 'Portrait'),
  ('Portrait of a Woman', 'digital', 'http://localhost:8080/images/medium/Portrait_of_a_Woman', 0.00, 'In stock', 'Portrait');
