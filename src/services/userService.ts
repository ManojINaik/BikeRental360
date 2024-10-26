import { query, transaction } from '../lib/db';
import { User } from 'firebase/auth';

export interface DBUser {
  id: string;
  firebase_uid: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  role: 'user' | 'admin';
  status: 'active' | 'suspended';
  created_at: Date;
  updated_at: Date;
}

export async function createUser(firebaseUser: User, additionalData?: Partial<DBUser>): Promise<string> {
  const id = crypto.randomUUID();
  await query(
    `INSERT INTO users (id, firebase_uid, name, email, phone, role, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      firebaseUser.uid,
      firebaseUser.displayName || additionalData?.name || '',
      firebaseUser.email || '',
      firebaseUser.phoneNumber || additionalData?.phone || '',
      additionalData?.role || 'user',
      additionalData?.status || 'active'
    ]
  );
  return id;
}

export async function getAllUsers(): Promise<DBUser[]> {
  return query(
    'SELECT * FROM users ORDER BY created_at DESC'
  ) as Promise<DBUser[]>;
}

export async function getUserByFirebaseUid(firebaseUid: string): Promise<DBUser | null> {
  const users = await query(
    'SELECT * FROM users WHERE firebase_uid = ?',
    [firebaseUid]
  ) as DBUser[];
  return users[0] || null;
}

export async function updateUser(id: string, data: Partial<DBUser>): Promise<void> {
  const fields = Object.keys(data)
    .map(key => `${key} = ?`)
    .join(', ');
  const values = [...Object.values(data), id];

  await query(
    `UPDATE users SET ${fields} WHERE id = ?`,
    values
  );
}

export async function deleteUser(id: string): Promise<void> {
  return transaction(async (connection) => {
    // Delete related records first
    await connection.execute('DELETE FROM user_preferences WHERE user_id = ?', [id]);
    await connection.execute('DELETE FROM notifications WHERE user_id = ?', [id]);
    await connection.execute('DELETE FROM reviews WHERE user_id = ?', [id]);
    await connection.execute('DELETE FROM bookings WHERE user_id = ?', [id]);
    // Finally delete the user
    await connection.execute('DELETE FROM users WHERE id = ?', [id]);
  });
}

export async function searchUsers(params: {
  query?: string;
  role?: string;
  status?: string;
}): Promise<DBUser[]> {
  let sql = 'SELECT * FROM users WHERE 1=1';
  const values: any[] = [];

  if (params.query) {
    sql += ' AND (name LIKE ? OR email LIKE ?)';
    values.push(`%${params.query}%`, `%${params.query}%`);
  }

  if (params.role) {
    sql += ' AND role = ?';
    values.push(params.role);
  }

  if (params.status) {
    sql += ' AND status = ?';
    values.push(params.status);
  }

  sql += ' ORDER BY created_at DESC';

  return query(sql, values) as Promise<DBUser[]>;
}