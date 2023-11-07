'use client';

import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation.js';
import { useState } from 'react';
import axios from 'axios';
import { useUtils } from '@/app/providers/UtilsContext';

export default function CreateGame() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useUtils();
  const createGame = async () => {
    setLoading(true);
    const res = await axios.post('/api/game/create');

    if (res.status !== 200) toast.error('Server not response');
    if (res.status === 200) router.push(`/game/${res.data.value}`);

    setLoading(false);
  };

  return (
    <Button isLoading={loading} onPress={() => createGame()}>
      Create a new game
    </Button>
  );
}
