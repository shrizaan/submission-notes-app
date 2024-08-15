import { query } from '@/utils/database';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  const { title, body } = await req.json();
  const createdAt = new Date();
  const id = `note-${nanoid(16)}`;

  const { rows } = await query(
    'INSERT INTO notes(id, title, body, created_at) VALUES($1, $2, $3, $4) RETURNING *',
    [id, title, body, createdAt]
  );

  return NextResponse.json({
    message: 'Note created successfully',
    note: rows[0],
  }, { status: 201 });
};

export const GET = async () => {
  const notes = await query('SELECT * FROM notes');
  return NextResponse.json(notes.rows, { status: 200 });
};
