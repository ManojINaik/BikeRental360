import { query } from '../lib/db';

export interface Bike {
  id: string;
  name: string;
  type: string;
  location: string;
  price: number;
  description?: string;
  features?: string;
  image_url?: string;
  status: 'available' | 'rented' | 'maintenance';
  rating: number;
  reviews_count: number;
}

export async function getAllBikes(): Promise<Bike[]> {
  return query(
    'SELECT * FROM bikes WHERE status = "available" ORDER BY created_at DESC'
  ) as Promise<Bike[]>;
}

export async function getBikeById(id: string): Promise<Bike | null> {
  const bikes = await query('SELECT * FROM bikes WHERE id = ?', [id]) as Bike[];
  return bikes[0] || null;
}

export async function searchBikes(params: {
  type?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Bike[]> {
  let sql = 'SELECT * FROM bikes WHERE status = "available"';
  const values: any[] = [];

  if (params.type) {
    sql += ' AND type = ?';
    values.push(params.type);
  }

  if (params.location) {
    sql += ' AND location LIKE ?';
    values.push(`%${params.location}%`);
  }

  if (params.minPrice !== undefined) {
    sql += ' AND price >= ?';
    values.push(params.minPrice);
  }

  if (params.maxPrice !== undefined) {
    sql += ' AND price <= ?';
    values.push(params.maxPrice);
  }

  sql += ' ORDER BY created_at DESC';

  return query(sql, values) as Promise<Bike[]>;
}

export async function createBike(bike: Omit<Bike, 'id' | 'rating' | 'reviews_count'>): Promise<string> {
  const id = crypto.randomUUID();
  await query(
    `INSERT INTO bikes (id, name, type, location, price, description, features, image_url, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, bike.name, bike.type, bike.location, bike.price, bike.description, bike.features, bike.image_url, bike.status]
  );
  return id;
}

export async function updateBike(id: string, bike: Partial<Bike>): Promise<void> {
  const fields = Object.keys(bike)
    .map(key => `${key} = ?`)
    .join(', ');
  const values = [...Object.values(bike), id];

  await query(`UPDATE bikes SET ${fields} WHERE id = ?`, values);
}

export async function deleteBike(id: string): Promise<void> {
  await query('DELETE FROM bikes WHERE id = ?', [id]);
}