import { Router } from 'express';
import {
  createBarangController,
  deleteBarangController,
  getAllBarangController,
  getBarangByIdController,
  updateBarangController,
} from './barang.controller';
import { verifyToken } from '../middleware/auth';

export const BarangRouter: Router = Router();

// Route untuk menambahkan barang
BarangRouter.post('/', verifyToken, createBarangController);
BarangRouter.put('/:id', verifyToken, updateBarangController);
BarangRouter.delete('/:id', verifyToken, deleteBarangController);
BarangRouter.get('/', verifyToken, getAllBarangController);
BarangRouter.get('/:id', verifyToken, getBarangByIdController);
