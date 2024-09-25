import { Router } from 'express';
import {
  createMutasiController,
  deleteMutasiController,
  getAllMutasiController,
  getMutasiByBarangIdController,
  getMutasiByIdController,
  getMutasiByUserIdController,
  updateMutasiController,
} from './mutasi.controller';
import { verifyToken } from '../middleware/auth';

export const MutasiRouter: Router = Router();

MutasiRouter.post('/', verifyToken, createMutasiController);
MutasiRouter.put('/:id', verifyToken, updateMutasiController);
MutasiRouter.delete('/:id', verifyToken, deleteMutasiController);
MutasiRouter.get('/', verifyToken, getAllMutasiController);
MutasiRouter.get('/:id', verifyToken, getMutasiByIdController);
MutasiRouter.get('/user/:userId', verifyToken, getMutasiByUserIdController);
MutasiRouter.get(
  '/barang/:barangId',
  verifyToken,
  getMutasiByBarangIdController
);
