import { query, transaction } from '../lib/db';

export interface Booking {
  id: string;
  user_id: string;
  bike_id: string;
  start_date: Date;
  end_date: Date;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export async function createBooking(booking: Omit<Booking, 'id'>): Promise<string> {
  return transaction(async (connection) => {
    // Check if bike is available for the requested dates
    const [overlapping] = await connection.execute(
      `SELECT COUNT(*) as count FROM bookings 
       WHERE bike_id = ? 
       AND status IN ('pending', 'confirmed')
       AND ((start_date BETWEEN ? AND ?) OR (end_date BETWEEN ? AND ?))`,
      [booking.bike_id, booking.start_date, booking.end_date, booking.start_date, booking.end_date]
    ) as [{ count: number }[], any];

    if (overlapping[0].count > 0) {
      throw new Error('Bike is not available for the selected dates');
    }

    const id = crypto.randomUUID();
    await connection.execute(
      `INSERT INTO bookings (id, user_id, bike_id, start_date, end_date, total_amount, status)
       VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
      [id, booking.user_id, booking.bike_id, booking.start_date, booking.end_date, booking.total_amount]
    );

    // Update bike status
    await connection.execute(
      'UPDATE bikes SET status = "rented" WHERE id = ?',
      [booking.bike_id]
    );

    return id;
  });
}

export async function getUserBookings(userId: string): Promise<Booking[]> {
  return query(
    `SELECT b.*, bi.name as bike_name, bi.image_url 
     FROM bookings b
     JOIN bikes bi ON b.bike_id = bi.id
     WHERE b.user_id = ?
     ORDER BY b.created_at DESC`,
    [userId]
  ) as Promise<Booking[]>;
}

export async function updateBookingStatus(id: string, status: Booking['status']): Promise<void> {
  return transaction(async (connection) => {
    await connection.execute(
      'UPDATE bookings SET status = ? WHERE id = ?',
      [status, id]
    );

    if (status === 'completed' || status === 'cancelled') {
      const [booking] = await connection.execute(
        'SELECT bike_id FROM bookings WHERE id = ?',
        [id]
      ) as [{ bike_id: string }[], any];

      await connection.execute(
        'UPDATE bikes SET status = "available" WHERE id = ?',
        [booking[0].bike_id]
      );
    }
  });
}