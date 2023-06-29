import { Router } from 'express';
import movieRoutes from './movies.routes';

const router = Router();

router.get('/', (_req, res) => {
  res.send(`
    <b>Name:</b> movies-backend-ts<br>
    <b>Author:</b> CHRod<br>
    <b>Version:</b> 1.0.0
    `);
});

router.use('/api/v1/ping', (_req, res) => {
  return res.status(200).send({ ChrodApiSays: 'Server status is OK!' });
});

router.use('/api/v1/movies', movieRoutes);

export default router;
