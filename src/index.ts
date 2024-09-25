import express, { Application, Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { logger } from './utils/logger';
import { UserRouter } from './user/user.route';
import { BarangRouter } from './barang/barang.route';
import { MutasiRouter } from './mutasi/mutasi.route';

const app: Application = express();
const port: Number = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const _routes: [string, Router][] = [
  ['/api/auth', UserRouter],
  ['/api/barang', BarangRouter],
  ['/api/mutasi', MutasiRouter],
];
_routes.forEach((route) => {
  const [url, router] = route;
  app.use(url, router);
});

app.listen(port, () => logger.info(`Server is listening on port ${port}`));
