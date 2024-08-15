import { NextResponse } from 'next/server';
import { query } from '@/utils/database';

export const GET = async (req, { params }) => {
  const { rows } = await query('SELECT * FROM notes WHERE id = $1', [
    params.noteId,
  ]);
  return NextResponse.json(rows[0]);
};

export const PUT = async (req, { params }) => {
  const data = await req.json();

  const { title, body } = data;
  const updatedAt = new Date();
  const { noteId } = params;

  const { rows } = await query(
    'UPDATE notes SET title = $1, body = $2, updated_at = $3 WHERE id = $4 RETURNING *',
    [title, body, updatedAt, noteId]
  );
  return NextResponse.json(
    {
      message: `Note with id ${noteId} updated successfully`,
      note: rows[0],
    },
    { status: 200 }
  );
};

export const DELETE = async (req, { params }) => {
  await query('DELETE FROM notes WHERE id = $1', [params.noteId]);
  return NextResponse.json({
    message: `Note with id ${params.noteId} deleted successfully`,
  });
};
