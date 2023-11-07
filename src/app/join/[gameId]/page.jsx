'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Join({ params }) {
  const { status } = useSession();
  const { gameId } = params;
  const router = useRouter();

  useEffect(() => {
    const join = async () => {
      const tk = await axios.put('/api/game/join', {
        gameId,
      });
      if (tk?.data) {
        router.push(`/game/${tk.data.value}`);
      }
    };
    if (status === 'authenticated') join();
    else if (status === 'unauthenticated') router.push('/play');
  }, [status]);

  return (null);
}
