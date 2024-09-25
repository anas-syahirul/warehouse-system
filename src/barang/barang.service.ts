import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateBarangDTO {
  nama_barang: string;
  kode: string;
  kategori: string;
  lokasi: string;
  stok: number;
}

//
export const createBarangService = async (data: CreateBarangDTO) => {
  const barang = await prisma.barang.create({
    data,
  });
  return barang;
};

interface UpdateBarangDTO {
  nama_barang?: string;
  kode?: string;
  kategori?: string;
  lokasi?: string;
  stok?: number;
}

export const updateBarangService = async (
  id: string,
  data: UpdateBarangDTO
) => {
  const updatedBarang = await prisma.barang.update({
    where: { id },
    data,
  });
  return updatedBarang;
};

export const deleteBarangService = async (id: string) => {
  const deletedBarang = await prisma.barang.delete({
    where: { id },
  });
  return deletedBarang;
};

export const getAllBarangService = async () => {
  const barang = await prisma.barang.findMany();
  return barang;
};

export const getBarangByIdService = async (id: string) => {
  const barang = await prisma.barang.findUnique({
    where: { id },
  });
  return barang;
};
