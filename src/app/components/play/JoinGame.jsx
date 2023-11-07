'use client';

import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUtils } from '@/app/providers/UtilsContext';

export default function JoinGame() {
  const [pin, setPin] = useState('');
  const router = useRouter();
  const { toast } = useUtils();
  const [loading, setLoading] = useState(false);
  const joinGame = async () => {
    setLoading(true);
    const res = await axios.put('/api/game/join', {
      gameId: pin,
    });

    if (res.status !== 200) toast.error('Error al unirse a la sala');

    if (res.data?.value === pin) router.push(`/game/${res.data?.value}`);
    setLoading(false);
  };
  return (
    <div className="flex gap-2">
      <Input
        onChange={(e) => setPin(e.target.value)}
        value={pin}
        size="md"
        type="text"
        labelPlacement="outside"
        maxLength={100}
        required
        classNames={{
          inputWrapper: [
            'bg-gray-300',
          ],
        }}
      />
      <Button isLoading={loading} onPress={() => joinGame()}>
        Play
      </Button>
    </div>
  );
}
