import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import { nextAuthConfig } from '../../auth/[...nextauth]/route';
import Game from '@/db/models/Game.js';
import User from '@/db/models/User.js';

export async function PUT(req) {
  dbConnect();
  const session = await getServerSession(nextAuthConfig);

  if (!session) return NextResponse.json({ error: 'Wrong Credentials' }, { status: 401 });

  const currentUser = session.user;
  const { gameId } = await req.json();

  let game;
  try {
    game = await Game.findById(gameId);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  if (!game) return NextResponse.json({ error: 'Corrupt game' }, { status: 401 });

  let user1;
  try {
    user1 = await User.findById(game.player1);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  if (!user1 || game?.player2) return NextResponse.json({ error: 'Invalid action' }, { status: 401 });

  try {
    game.player2 = currentUser.id;
    console.log(game);
    await game.save();
    return NextResponse.json({ value: gameId });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
