const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '../../data/items.json');

let cachedStats = null;
let lastModified = null;

function calculateStats(items) {
  if (items.length === 0) {
    return { total: 0, averagePrice: 0 };
  }
  return {
    total: items.length,
    averagePrice: items.reduce((acc, cur) => acc + cur.price, 0) / items.length
  };
}

async function updateStats() {
  try {
    const raw = await fs.promises.readFile(DATA_PATH, 'utf8');
    const items = JSON.parse(raw);
    cachedStats = calculateStats(items);
    const stats = await fs.promises.stat(DATA_PATH);
    lastModified = stats.mtimeMs;
  } catch (err) {
    console.error('Error updating stats:', err);
  }
}

fs.watchFile(DATA_PATH, async (curr, prev) => {
  if (curr.mtimeMs !== prev.mtimeMs) {
    await updateStats();
  }
});

updateStats();

router.get('/', async (req, res, next) => {
  try {
    if (!cachedStats) {
      await updateStats();
    }
    res.json(cachedStats);
  } catch (err) {
    next(err);
  }
});

module.exports = router;