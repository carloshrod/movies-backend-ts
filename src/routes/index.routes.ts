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

router.use('/api/v1/movies', movieRoutes);

export default router;
