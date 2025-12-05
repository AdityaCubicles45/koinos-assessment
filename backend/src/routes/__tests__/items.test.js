const request = require('supertest');
const express = require('express');
const itemsRouter = require('../items');
const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = path.join(__dirname, '../../../data/items.json');
const originalData = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 2499 },
  { id: 2, name: 'Noise Cancelling Headphones', category: 'Electronics', price: 399 },
  { id: 3, name: 'Ultra‑Wide Monitor', category: 'Electronics', price: 999 },
  { id: 4, name: 'Ergonomic Chair', category: 'Furniture', price: 799 },
  { id: 5, name: 'Standing Desk', category: 'Furniture', price: 1199 }
];

const app = express();
app.use(express.json());
app.use('/api/items', itemsRouter);

beforeEach(async () => {
  await fs.writeFile(DATA_PATH, JSON.stringify(originalData, null, 2), 'utf8');
});

describe('GET /api/items', () => {
  it('should return all items with pagination', async () => {
    const res = await request(app)
      .get('/api/items')
      .expect(200);

    expect(res.body).toHaveProperty('items');
    expect(res.body).toHaveProperty('total', 5);
    expect(res.body).toHaveProperty('page', 1);
    expect(res.body).toHaveProperty('limit', 10);
    expect(res.body.items).toHaveLength(5);
  });

  it('should return paginated results', async () => {
    const res = await request(app)
      .get('/api/items?page=1&limit=2')
      .expect(200);

    expect(res.body.items).toHaveLength(2);
    expect(res.body.totalPages).toBe(3);
  });

  it('should filter items by search query', async () => {
    const res = await request(app)
      .get('/api/items?q=laptop')
      .expect(200);

    expect(res.body.items).toHaveLength(1);
    expect(res.body.items[0].name).toContain('Laptop');
  });

  it('should handle empty search results', async () => {
    const res = await request(app)
      .get('/api/items?q=nonexistent')
      .expect(200);

    expect(res.body.items).toHaveLength(0);
    expect(res.body.total).toBe(0);
  });
});

describe('GET /api/items/:id', () => {
  it('should return a single item by id', async () => {
    const res = await request(app)
      .get('/api/items/1')
      .expect(200);

    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('name', 'Laptop Pro');
  });

  it('should return 404 for non-existent item', async () => {
    const res = await request(app)
      .get('/api/items/999')
      .expect(404);

    expect(res.body).toHaveProperty('message');
  });
});

describe('POST /api/items', () => {
  it('should create a new item', async () => {
    const newItem = {
      name: 'Test Item',
      category: 'Test',
      price: 100
    };

    const res = await request(app)
      .post('/api/items')
      .send(newItem)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'Test Item');
    expect(res.body).toHaveProperty('price', 100);
  });

  it('should return 400 if name is missing', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ price: 100 })
      .expect(400);

    expect(res.body).toHaveProperty('message');
  });

  it('should return 400 if price is missing', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'Test Item' })
      .expect(400);

    expect(res.body).toHaveProperty('message');
  });
});

