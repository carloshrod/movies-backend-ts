import { Router } from 'express';
import movieRoutes from './movies.routes';
import pool from '../database/db';

const router = Router();

router.get('/', (_req, res) => {
  res.send(`
    <b>Name:</b> movies-backend-ts<br>
    <b>Author:</b> CHRod<br>
    <b>Version:</b> 1.0.0
    `);
});

router.use('/api/v1/ping', async (_req, res) => {
  const result = await pool.query('SELECT NOW()');
  return res
    .status(200)
    .send({ ChrodApiSays: 'Server status is OK!', PostgreSays: result.rows[0] });
});

router.use('/api/v1/movies', movieRoutes);

export default router;
