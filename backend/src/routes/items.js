const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '../../../data/items.json');

async function readData() {
  const raw = await fs.readFile(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

async function writeData(data) {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
}

router.get('/', async (req, res, next) => {
  try {
    const data = await readData();
    const { limit, q, page = '1' } = req.query;
    let results = data;

    if (q) {
      results = results.filter(item => 
        item.name.toLowerCase().includes(q.toLowerCase()) ||
        item.category?.toLowerCase().includes(q.toLowerCase())
      );
    }

    const pageNum = parseInt(page);
    const limitNum = limit ? parseInt(limit) : 10;
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedResults = results.slice(startIndex, endIndex);

    res.json({
      items: paginatedResults,
      total: results.length,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(results.length / limitNum)
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await readData();
    const item = data.find(i => i.id === parseInt(req.params.id));
    if (!item) {
      const err = new Error('Item not found');
      err.status = 404;
      throw err;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const item = req.body;
    if (!item.name || item.price === undefined) {
      const err = new Error('Name and price are required');
      err.status = 400;
      throw err;
    }
    const data = await readData();
    item.id = Date.now();
    data.push(item);
    await writeData(data);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

module.exports = router;