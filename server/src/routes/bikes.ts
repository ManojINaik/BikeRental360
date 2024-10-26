import { Router } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

const bikeSchema = z.object({
  name: z.string(),
  type: z.string(),
  location: z.string(),
  price: z.number().positive(),
  image: z.string().url()
});

router.get('/', async (req, res, next) => {
  try {
    const bikes = await prisma.bike.findMany({
      where: {
        available: true
      }
    });
    res.json(bikes);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const bike = await prisma.bike.findUnique({
      where: { id: req.params.id }
    });
    res.json(bike);
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const data = bikeSchema.parse(req.body);
    const bike = await prisma.bike.create({ data });
    res.status(201).json(bike);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const data = bikeSchema.partial().parse(req.body);
    const bike = await prisma.bike.update({
      where: { id: req.params.id },
      data
    });
    res.json(bike);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    await prisma.bike.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { router as bikeRouter };