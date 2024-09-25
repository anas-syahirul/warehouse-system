import { Request, Response } from 'express';
import {
  createMutasiService,
  deleteMutasiService,
  getAllMutasiService,
  getMutasiByBarangIdService,
  getMutasiByIdService,
  getMutasiByUserIdService,
  updateMutasiService,
} from './mutasi.service';
import { createError } from '../utils/createError';

export const createMutasiController = async (req: Request, res: Response) => {
  try {
    const { barangId, userId, jenis_mutasi, jumlah, tanggal } = req.body;

    if (!barangId || !userId || !jenis_mutasi || !jumlah) {
      return res
        .status(400)
        .json({ status: false, statusCode: 400, message: 'Missing field' });
    }

    const mutasi = await createMutasiService({
      barangId,
      userId,
      jenis_mutasi,
      jumlah,
      tanggal: tanggal || new Date(),
    });

    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: 'Mutation successfully created',
      data: mutasi,
    });
  } catch (error) {
    createError(res, error, 'mutasi', 'create');
  }
};

export const updateMutasiController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { barangId, userId, jenis_mutasi, jumlah, tanggal } = req.body;

    if (!barangId || !userId || !jenis_mutasi || !jumlah) {
      return res
        .status(400)
        .json({ status: false, statusCode: 400, message: 'missing field' });
    }

    const updatedMutasi = await updateMutasiService(id, {
      barangId,
      userId,
      jenis_mutasi,
      jumlah,
      tanggal: tanggal || new Date(),
    });

    if (!updatedMutasi) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: 'invalid mutation id',
      });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Mutatin successfully updated',
      data: updatedMutasi,
    });
  } catch (error) {
    createError(res, error, 'mutasi', 'update');
  }
};

export const deleteMutasiController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedMutasi = await deleteMutasiService(id);

    if (!deletedMutasi) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: 'invalid mutation id',
      });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'mutation successfully deleted',
      data: deletedMutasi,
    });
  } catch (error) {
    createError(res, error, 'mutasi', 'delete');
  }
};

export const getAllMutasiController = async (req: Request, res: Response) => {
  try {
    const mutasiList = await getAllMutasiService();

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'success get all mutation data',
      data: mutasiList,
    });
  } catch (error) {
    createError(res, error, 'mutasi', 'get all');
  }
};

export const getMutasiByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const mutasi = await getMutasiByIdService(id);

    if (!mutasi) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: 'invalid mutation id',
      });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'success get mutation',
      data: mutasi,
    });
  } catch (error) {
    createError(res, error, 'mutasi', 'get by id');
  }
};

export const getMutasiByUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;

    const mutasiList = await getMutasiByUserIdService(userId);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'success get data mutation',
      data: mutasiList,
    });
  } catch (error) {
    createError(res, error, 'mutasi', 'get by user id');
  }
};

export const getMutasiByBarangIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { barangId } = req.params;

    const mutasiList = await getMutasiByBarangIdService(barangId);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Success get mutation data',
      data: mutasiList,
    });
  } catch (error) {
    createError(res, error, 'mutasi', 'get by barang id');
  }
};
