import { Router } from 'express';
import {
  createSession,
  deleteUserController,
  getAllStaffUsersController,
  registerUser,
  updateUserController,
} from './user.controller';
import { verifyToken } from '../middleware/auth';

export const UserRouter: Router = Router();

UserRouter.post('/register', registerUser);
UserRouter.post('/login', createSession);
UserRouter.get('/staff', verifyToken, getAllStaffUsersController);
UserRouter.delete('/:id', verifyToken, deleteUserController);
UserRouter.put('/:id', verifyToken, updateUserController);
