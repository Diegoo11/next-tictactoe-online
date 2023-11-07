'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CircularProgress } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import UserProfile from '@/app/components/UserProfile';
import { useUtils } from '@/app/providers/UtilsContext';
import InvitationLink from '@/app/components/Game/InvitationLink';
import Table from '@/app/components/Game/Table';

export default function Game({ params }) {
  const { gameId } = params;
  const { data, status } = useSession();
  const user = data?.user;

  const { socket } = useUtils();
  const router = useRouter();
  const [turn, setTurn] = useState(11);
  const [enemy, setEnemy] = useState({
    image: '/interrogatorio.svg',
    user: 'Not authenticated',
  });
  const [ico, setIco] = useState(0);
  const [initTable, setInitTable] = useState({});

  useEffect(() => {
    if (status === 'authenticated') {
      socket.emit('conectGame', { gameId });
      socket.on('joinPlayer', (res) => {
        if (res.player1.id !== user.id) {
          setEnemy(res.player1);
          setIco(2);
          setTurn(res.table.status === 2);
        } else if (res?.player2) {
          if (res.player2.id) setEnemy(res.player2);
          setIco(1);
          setTurn(res.table.status === 1);
        }
        setInitTable(res.table);
      });
    }
  }, [status]);

  if (status === 'loading') return <CircularProgress aria-label="Loading..." />;
  if (!user) router.push('/play');

  const changeTurn = () => setTurn((t) => !t);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row m-2 justify-center items-center">
        <UserProfile
          src={user.image}
          username={user.name}
          turn={turn}
        />
        <span className="text-white">
          <Table
            changeTurn={changeTurn}
            ico={ico}
            setTurn={setTurn}
            turn={turn}
            params={params}
            user={user}
            initTable={initTable}
          />
        </span>
        <UserProfile
          src={enemy.image}
          username={enemy.user}
          turn={!turn}
        />
      </div>
      <InvitationLink gameId={gameId} />
    </div>
  );
}
