import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function generateToken(user: User): string {
  return jwt.sign(
    { 
      id: user.id,
      email: user.email,
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}