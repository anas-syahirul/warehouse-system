import { Request, Response } from 'express';
import {
  createBarangService,
  deleteBarangService,
  getAllBarangService,
  getBarangByIdService,
  updateBarangService,
} from './barang.service';
import { createError } from '../utils/createError';

export const createBarangController = async (req: Request, res: Response) => {
  try {
    const { nama_barang, kode, kategori, lokasi, stok } = req.body;

    const barang = await createBarangService({
      nama_barang,
      kode,
      kategori,
      lokasi,
      stok,
    });

    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: 'success create barang',
      data: barang,
    });
  } catch (error) {
    createError(res, error, 'barang', 'create');
  }
};

export const updateBarangController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nama_barang, kode, kategori, lokasi, stok } = req.body;

    const updatedBarang = await updateBarangService(id, {
      nama_barang,
      kode,
      kategori,
      lokasi,
      stok,
    });

    if (!updatedBarang) {
      return res
        .status(404)
        .json({ status: false, statusCode: 404, message: 'invalid barang id' });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'barang successfully updated',
      data: updatedBarang,
    });
  } catch (error) {
    createError(res, error, 'barang', 'update');
  }
};

export const deleteBarangController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedBarang = await deleteBarangService(id);

    if (!deletedBarang) {
      return res
        .status(404)
        .json({ status: false, statusCode: 404, message: 'invalid barang id' });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'barang successfully deleted',
      data: deletedBarang,
    });
  } catch (error) {
    createError(res, error, 'barang', 'delete');
  }
};

export const getAllBarangController = async (req: Request, res: Response) => {
  try {
    const barang = await getAllBarangService();
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'success get all barang',
      data: barang,
    });
  } catch (error) {
    createError(res, error, 'barang', 'get all');
  }
};

export const getBarangByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const barang = await getBarangByIdService(id);

    if (!barang) {
      return res
        .status(404)
        .json({ status: false, statusCode: 404, message: 'invalid barang id' });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'success get barang',
      data: barang,
    });
  } catch (error) {
    createError(res, error, 'barang', 'get by id');
  }
};
