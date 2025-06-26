import React, { useState } from 'react';

const initialProducts = [
  { id: 1, name: 'Laptop', description: 'A high performance laptop', price: 1200 },
  { id: 2, name: 'Smartphone', description: 'Latest model smartphone', price: 800 },
  { id: 3, name: 'Headphones', description: 'Noise cancelling headphones', price: 200 },
  { id: 4, name: 'Keyboard', description: 'Mechanical keyboard', price: 100 },
  { id: 5, name: 'Monitor', description: '4K Ultra HD monitor', price: 400 },
];

function ProductList() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', description: '', price: '' });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim() || !form.price) return;
    setProducts([
      ...products,
      {
        id: Date.now(),
        name: form.name,
        description: form.description,
        price: Number(form.price),
      },
    ]);
    setForm({ name: '', description: '', price: '' });
  }

  function handleDelete(id) {
    setProducts(products.filter(p => p.id !== id));
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'Arial' }}>
      <h2>Product Management</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: '1rem', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={{ flex: 1, minWidth: 100, padding: '0.5rem' }}
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={{ flex: 2, minWidth: 120, padding: '0.5rem' }}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          style={{ width: 80, padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Add</button>
      </form>
      <input
        type="text"
        placeholder="Search products by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
      />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredProducts.map(product => (
          <li key={product.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0 }}>{product.name}</h3>
              <p style={{ margin: '0.5rem 0' }}>{product.description}</p>
              <strong>${product.price}</strong>
            </div>
            <button onClick={() => handleDelete(product.id)} style={{ background: '#f44', color: '#fff', border: 'none', borderRadius: 4, padding: '0.5rem 1rem', cursor: 'pointer' }}>Delete</button>
          </li>
        ))}
        {filteredProducts.length === 0 && <li>No products found.</li>}
      </ul>
    </div>
  );
}

export default ProductList;
