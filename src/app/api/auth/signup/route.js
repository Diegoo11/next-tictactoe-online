import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import dbConnect from '@/db/dbConnect';
import User from '@/db/models/User';

export async function POST(req) {
  const { username, password } = await req.json();
  dbConnect();

  let userMatch;
  try {
    userMatch = await User.findOne({ username });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
  if (userMatch) return NextResponse.json({ error: 'Usuario ya registrado' }, { status: 400 });

  const hashPassword = await bcryptjs.hash(password, 10);

  const user = new User({
    username,
    password: hashPassword,
    imgSrc: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`,
  });

  try {
    await user.save();
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  return NextResponse.json({
    username,
    password,
  });
}
