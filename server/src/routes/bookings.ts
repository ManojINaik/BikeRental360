import { Router } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { authenticate } from '../middleware/auth';
import { ApiError } from '../utils/ApiError';

const router = Router();

const bookingSchema = z.object({
  bikeId: z.string(),
  startDate: z.string().transform(str => new Date(str)),
  endDate: z.string().transform(str => new Date(str))
});

router.post('/', authenticate, async (req, res, next) => {
  try {
    const data = bookingSchema.parse(req.body);
    
    const bike = await prisma.bike.findUnique({
      where: { id: data.bikeId }
    });

    if (!bike) {
      throw new ApiError(404, 'Bike not found');
    }

    if (!bike.available) {
      throw new ApiError(400, 'Bike is not available');
    }

    const days = Math.ceil(
      (data.endDate.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const booking = await prisma.booking.create({
      data: {
        userId: req.user!.id,
        bikeId: data.bikeId,
        startDate: data.startDate,
        endDate: data.endDate,
        totalPrice: bike.price * days
      },
      include: {
        bike: true
      }
    });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
});

router.get('/me', authenticate, async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: req.user!.id
      },
      include: {
        bike: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/cancel', authenticate, async (req, res, next) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: req.params.id }
    });

    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }

    if (booking.userId !== req.user!.id) {
      throw new ApiError(403, 'Not authorized');
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: req.params.id },
      data: { status: 'CANCELLED' }
    });

    res.json(updatedBooking);
  } catch (error) {
    next(error);
  }
});

export { router as bookingRouter };