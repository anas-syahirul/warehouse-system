import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

interface UserRegister {
  nama: string;
  email: string;
  password: string;
}

export const createUser = async (payload: UserRegister) => {
  return await prisma.user.create({
    data: {
      nama: payload.nama,
      password: payload.password,
      email: payload.email,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  console.log(user);
  return user;
};

export const getAllStaffUsersService = async () => {
  const staffUsers = await prisma.user.findMany({
    where: {
      role: 'STAFF',
    },
  });

  return staffUsers;
};

export const deleteUserByIdService = async (id: string) => {
  const deletedUser = await prisma.user.delete({
    where: { id },
  });

  return deletedUser;
};

export const updateUserService = async (id: string, updateData: any) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
  });

  return updatedUser;
};
