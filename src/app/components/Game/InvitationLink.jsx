'use client';

import { Snippet, Button } from '@nextui-org/react';
import { useState } from 'react';

export default function InvitationLink({ gameId }) {
  const [enlaceCopiado, setEnlaceCopiado] = useState(false);
  const location = window.location.href;
  const copyButton = () => {
    navigator.clipboard
      .writeText(`${location.substring(0, location.indexOf('game'))}join/${gameId}`)
      .then(() => setEnlaceCopiado(true));
    setTimeout(() => {
      setEnlaceCopiado(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-4 font-semibold text-center text-gray-600 mb-10">
      <div className="flex flex-col gap-2 justify-center items-center">
        <span>Comparte el link para jugar!</span>
        <Button onPress={copyButton}>
          {enlaceCopiado
            ? 'Link copied!'
            : 'Copy invitation link'}
        </Button>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <span>O pasales el codigo del juego</span>
        <Snippet className="w-30">{gameId}</Snippet>
      </div>
    </div>
  );
}
