import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './routes/index.routes';
import errorHandler from './middlewares/errorHandler';
dotenv.config();

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.use(router);

// Errors middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
  console.log(`\n********** Server listening on port ${PORT} **********`);
});
