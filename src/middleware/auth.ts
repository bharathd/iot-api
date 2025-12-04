import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import dbConfig from '../config/db';
import User from '../models/entities/user';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dHfrN4yHGxQl4W4euT3lLGl7Lvx1b8j1') as {
      userId: string;
      email: string;
      password: string;
      roleId: string;
    };
    const user = await dbConfig.getRepository(User).findOne({
      where: { userId: decoded.userId },
      relations: {
        organization: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    res.locals.user = user;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  if (user.role.roleName !== 'Admin') {
    return res.status(401).json({ message: 'Admin authorization required' });
  }
  next();
}