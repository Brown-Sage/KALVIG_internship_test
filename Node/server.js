const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: 'Laptop', description: 'A high performance laptop', price: 1200 },
  { id: 2, name: 'Smartphone', description: 'Latest model smartphone', price: 800 },
  { id: 3, name: 'Headphones', description: 'Noise cancelling headphones', price: 200 },
  { id: 4, name: 'Keyboard', description: 'Mechanical keyboard', price: 100 },
  { id: 5, name: 'Monitor', description: '4K Ultra HD monitor', price: 400 },
];

// GET /products
app.get('/products', (req, res) => {
  res.json(products);
});

// POST /products
app.post('/products', (req, res) => {
  const { name, description, price } = req.body;
  if (!name || !description || typeof price !== 'number') {
    return res.status(400).json({ error: 'Invalid product data' });
  }
  const newProduct = {
    id: Date.now(),
    name,
    description,
    price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// DELETE /products/:id
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const deleted = products.splice(index, 1)[0];
  res.json(deleted);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
