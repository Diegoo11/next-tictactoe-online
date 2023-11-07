import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import Table from '@/db/models/Table';
import Game from '@/db/models/Game';
import { nextAuthConfig } from '../../auth/[...nextauth]/route';
import dbConnect from '@/db/dbConnect';

export async function POST() {
  dbConnect();
  const session = await getServerSession(nextAuthConfig);

  if (!session) return NextResponse.json({ error: 'Wrong Credentials' }, { status: 401 });

  const currentUser = session.user;

  const table = new Table();

  try {
    await table.save();
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }

  const game = new Game({
    player1: currentUser.id,
    table: table.id,
  });

  try {
    await game.save();
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
  return NextResponse.json({ value: game.id });
}
