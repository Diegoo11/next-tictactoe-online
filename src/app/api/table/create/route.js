import dbConnect from '@/db/dbConnect';

export async function POST() {
  dbConnect();
}
