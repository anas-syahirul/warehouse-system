import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateMutasiDTO {
  barangId: string;
  userId: string;
  jenis_mutasi: 'MASUK' | 'KELUAR';
  jumlah: number;
  tanggal: Date;
}

export const createMutasiService = async (data: CreateMutasiDTO) => {
  const barang = await prisma.barang.findUnique({
    where: { id: data.barangId },
  });

  if (!barang) {
    throw new Error('Barang tidak ditemukan');
  }

  const mutasi = await prisma.mutasi.create({
    data: {
      barangId: data.barangId,
      userId: data.userId,
      jenis_mutasi: data.jenis_mutasi,
      jumlah: data.jumlah,
      tanggal: data.tanggal,
    },
  });

  if (data.jenis_mutasi === 'MASUK') {
    await prisma.barang.update({
      where: { id: data.barangId },
      data: { stok: barang.stok + data.jumlah },
    });
  } else if (data.jenis_mutasi === 'KELUAR') {
    if (barang.stok < data.jumlah) {
      throw new Error('Stok tidak mencukupi');
    }
    await prisma.barang.update({
      where: { id: data.barangId },
      data: { stok: barang.stok - data.jumlah },
    });
  }

  return mutasi;
};

interface UpdateMutasiDTO {
  barangId: string;
  userId: string;
  jenis_mutasi: 'MASUK' | 'KELUAR';
  jumlah: number;
  tanggal: Date;
}

export const updateMutasiService = async (
  id: string,
  data: UpdateMutasiDTO
) => {
  const mutasi = await prisma.mutasi.findUnique({
    where: { id },
  });

  if (!mutasi) {
    throw new Error('Mutasi tidak ditemukan');
  }

  const barang = await prisma.barang.findUnique({
    where: { id: data.barangId },
  });

  if (!barang) {
    throw new Error('Barang tidak ditemukan');
  }

  if (
    mutasi.jenis_mutasi !== data.jenis_mutasi ||
    mutasi.jumlah !== data.jumlah
  ) {
    if (mutasi.jenis_mutasi === 'MASUK') {
      await prisma.barang.update({
        where: { id: data.barangId },
        data: { stok: barang.stok - mutasi.jumlah },
      });
    } else {
      await prisma.barang.update({
        where: { id: data.barangId },
        data: { stok: barang.stok + mutasi.jumlah },
      });
    }

    if (data.jenis_mutasi === 'MASUK') {
      await prisma.barang.update({
        where: { id: data.barangId },
        data: { stok: barang.stok + data.jumlah },
      });
    } else if (data.jenis_mutasi === 'KELUAR') {
      if (barang.stok < data.jumlah) {
        throw new Error('Stok tidak mencukupi');
      }

      await prisma.barang.update({
        where: { id: data.barangId },
        data: { stok: barang.stok - data.jumlah },
      });
    }
  }

  const updatedMutasi = await prisma.mutasi.update({
    where: { id },
    data: {
      barangId: data.barangId,
      userId: data.userId,
      jenis_mutasi: data.jenis_mutasi,
      jumlah: data.jumlah,
      tanggal: data.tanggal,
    },
  });

  return updatedMutasi;
};

export const deleteMutasiService = async (id: string) => {
  const mutasi = await prisma.mutasi.findUnique({
    where: { id },
  });

  if (!mutasi) {
    throw new Error('Mutasi tidak ditemukan');
  }

  const barang = await prisma.barang.findUnique({
    where: { id: mutasi.barangId },
  });

  if (!barang) {
    throw new Error('Barang tidak ditemukan');
  }

  if (mutasi.jenis_mutasi === 'MASUK') {
    await prisma.barang.update({
      where: { id: mutasi.barangId },
      data: { stok: barang.stok - mutasi.jumlah },
    });
  } else if (mutasi.jenis_mutasi === 'KELUAR') {
    await prisma.barang.update({
      where: { id: mutasi.barangId },
      data: { stok: barang.stok + mutasi.jumlah },
    });
  }

  const deletedMutasi = await prisma.mutasi.delete({
    where: { id },
  });

  return deletedMutasi;
};

export const getAllMutasiService = async () => {
  const mutasiList = await prisma.mutasi.findMany({
    include: {
      barang: true,
      user: true,
    },
  });

  return mutasiList;
};

export const getMutasiByIdService = async (id: string) => {
  const mutasi = await prisma.mutasi.findUnique({
    where: { id },
    include: {
      barang: true,
      user: true,
    },
  });

  return mutasi;
};

export const getMutasiByUserIdService = async (userId: string) => {
  const mutasiList = await prisma.mutasi.findMany({
    where: { userId },
    include: {
      barang: true,
      user: true,
    },
  });

  return mutasiList;
};

export const getMutasiByBarangIdService = async (barangId: string) => {
  const mutasiList = await prisma.mutasi.findMany({
    where: { barangId },
    include: {
      barang: true,
      user: true,
    },
  });

  return mutasiList;
};
