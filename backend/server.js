import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import uploadRouter from './routes/upload.js';
import locationsRouter from './routes/locations.js';
import containersRouter from './routes/containers.js';
import itemsRouter from './routes/items.js';
import searchRouter from './routes/search.js';

// Fail fast with a clear message if required config is missing, rather than
// a cryptic driver error deep in the stack.
const REQUIRED_ENV = ['MONGO_URI'];
const missing = REQUIRED_ENV.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(
    `Missing required environment variable(s): ${missing.join(', ')}.\n` +
      'Set them in your hosting provider (e.g. Render dashboard) or backend/.env.'
  );
  process.exit(1);
}

const app = express();

// Render (and most hosts) sit behind a reverse proxy. Trusting it lets Express
// see the real protocol/IP so rate-limiting and logging work correctly.
app.set('trust proxy', 1);

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
}));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => { console.error('MongoDB connection error:', err); process.exit(1); });

// Public health check (used by Render).
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/upload', uploadRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/containers', containersRouter);
app.use('/api/items', itemsRouter);
app.use('/api/search', searchRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
