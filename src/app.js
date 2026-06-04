// src/app.js
import express from 'express';
import path from 'path';
import { processInventory } from './functions.js';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(process.cwd(), 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'My App',
    message: 'Hello there!',
    text: 'How many stickers should I print',
  });
});

app.post('/fetch', async (req, res) => {
  res.render('await', {
    title: 'Please wait',
    store: req.body.store,
    qty: req.body.qty,
  });
});

app.post('/process', async (req, res) => {
  try {
    const { store, qty } = req.body;

    const cards = await processInventory(store, qty);

    if (store.toLowerCase() === 'entrall') {
      res.render('results-entrall', { title: 'Results', cards });
    } else {
      res.render('results', { title: 'Results', cards });
    }
  } catch (error) {
    console.error('Error in /process:', error);
    res.status(500).send(error.message);
  }
});

export default app;