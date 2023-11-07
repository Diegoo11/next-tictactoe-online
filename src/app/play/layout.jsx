'use client';

import { Button } from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import UserProfile from '@/app/components/UserProfile';
import CreateGame from '@/app/components/play/CreateGame';
import JoinGame from '@/app/components/play/JoinGame';
import ButtonLink from '../components/ButtonLink';

export default function PlayLayout({ children }) {
  const { data, status } = useSession();
  const isLoged = status === 'authenticated';
  let user = data?.user;
  if (!user) {
    user = {
      image: '/interrogatorio.svg',
      name: 'Not authenticated',
    };
  }

  return (
    <>
      <UserProfile
        src={user.image}
        username={user.name}
      />
      {
        isLoged ? (
          <div className="flex flex-col gap-4">
            <Button onPress={() => signOut()}>
              LogOut
            </Button>
            <div className="flex flex-col gap-2">
              <span className="text-gray-700">
                Crear una nueva partida:
              </span>
              <CreateGame />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-700">
                Ingresa el codigo de partida:
              </span>
              <JoinGame />
            </div>
          </div>
        ) : (
          <ButtonLink path="/play/login">
            Join
          </ButtonLink>
        )
      }
      {children}
    </>
  );
}
