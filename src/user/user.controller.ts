import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import { checkPassword, hashing } from '../utils/hashing';
import {
  createUser,
  deleteUserByIdService,
  findUserByEmail,
  getAllStaffUsersService,
  updateUserService,
} from './user.service';
import { Prisma } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/createError';

export const registerUser = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    user.password = `${hashing(user.password)}`;

    await createUser(user);
    logger.info('Success register user');
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: 'Success register user',
    });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const meta = error.meta as { target: string[] };
        const uniqueField = meta.target[0];
        logger.error(
          `ERR: user - register = Unique constraint failed on the fields: (${uniqueField})`
        );
        return res.status(500).send({
          status: false,
          statusCode: 500,
          message: `Unique constraint failed on the fields: (${uniqueField})`,
        });
      }
    } else {
      createError(res, error, 'user', 'register');
    }
  }
};

export const createSession = async (req: Request, res: Response) => {
  const userLogin = req.body;
  try {
    const user = await findUserByEmail(userLogin.email);
    if (user === null) {
      return res
        .status(404)
        .send({ status: false, statusCode: 422, message: 'Invalid Email' });
    }
    const isValid = checkPassword(userLogin.password, user.password);
    if (!isValid)
      return res
        .status(401)
        .json({ status: false, statusCode: 401, message: 'Invalid Password' });
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      return res.status(500).json({ error: 'JWT secret is not defined' });
    }
    const accessToken = jwt.sign({ ...user }, secretKey, { expiresIn: '1d' });

    logger.info('Login Success');
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Login success',
      data: { accessToken, user: { email: user.email, nama: user.nama } },
    });
  } catch (error: unknown) {
    createError(res, error, 'user', 'login');
  }
};

export const getAllStaffUsersController = async (
  req: Request,
  res: Response
) => {
  try {
    const userRole = res.locals.user.role;

    if (userRole !== 'ADMIN') {
      return res.status(403).json({
        status: false,
        statusCode: 403,
        message: 'Not Authorized',
      });
    }

    const staffUsers = await getAllStaffUsersService();

    // if (!staffUsers || staffUsers.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ status: false,
    //       statusCode: 404,message: 'Tidak ada user dengan role STAFF' });
    // }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'success get all staff data',
      data: staffUsers,
    });
  } catch (error) {
    createError(res, error, 'user', 'get all user');
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authenticatedUserId = res.locals.user.id;
    const userRole = res.locals.user.role;

    if (authenticatedUserId !== id || userRole !== 'ADMIN') {
      return res.status(403).json({
        status: false,
        statusCode: 403,
        message: 'Anda tidak diizinkan untuk menghapus akun orang lain',
      });
    }

    const deletedUser = await deleteUserByIdService(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ status: false, statusCode: 404, message: 'invalid id' });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'user successfully deleted',
      data: deletedUser,
    });
  } catch (error) {
    createError(res, error, 'user', 'delete user');
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authenticatedUserId = res.locals.user.id;
    const userRole = res.locals.user.role;
    const updateData = req.body;

    if (authenticatedUserId !== id || userRole !== 'ADMIN') {
      return res.status(403).json({
        status: false,
        statusCode: 403,
        message: 'Not Authorized',
      });
    }

    const updatedUser = await updateUserService(id, updateData);

    if (!updatedUser) {
      return res
        .status(404)
        .json({ status: false, statusCode: 404, message: 'invalid user id' });
    }

    return res.status(200).json({
      status: true,
      statusCode: 402003,
      message: 'user data successfully updated',
      data: updatedUser,
    });
  } catch (error) {
    createError(res, error, 'user', 'update user');
  }
};
