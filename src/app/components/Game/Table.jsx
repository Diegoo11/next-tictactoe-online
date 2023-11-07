'use client';

import { v4 as uuidv4 } from 'uuid';
import { Button, CircularProgress } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EndGame from './EndGame';
import ResetButton from './ResetButton';
import { useUtils } from '@/app/providers/UtilsContext';

const icons = {
  0: ' ',
  1: 'X',
  2: 'O',
};

function Table({
  changeTurn, ico, setTurn, turn, params, user, initTable,
}) {
  const router = useRouter();
  const { gameId } = params;
  const { socket } = useUtils();
  const [table, setTable] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  const [winner, setWinner] = useState(0);

  useEffect(() => {
    socket.on('played', (res) => {
      setTable([
        [res.table.p_0, res.table.p_1, res.table.p_2],
        [res.table.p_3, res.table.p_4, res.table.p_5],
        [res.table.p_6, res.table.p_7, res.table.p_8],
      ]);
      setTurn(res.table.status === ico);
      setWinner(res.table.winner);
    });
  }, [ico]);

  useEffect(() => {
    if (initTable?.p_0) {
      const tableObj = initTable;

      setTable([
        [tableObj.p_0, tableObj.p_1, tableObj.p_2],
        [tableObj.p_3, tableObj.p_4, tableObj.p_5],
        [tableObj.p_6, tableObj.p_7, tableObj.p_8],
      ]);
      setTurn(initTable.status === ico);
      setWinner(initTable.winner);
    }
  }, [initTable]);
  if (!initTable?.status) return <CircularProgress aria-label="Loading..." />;

  const tableObj = initTable;

  const playedClick = (x, y) => {
    if (!turn) return;
    const newTable = [...table];
    if (newTable[x][y] !== 0) return;
    newTable[x][y] = ico;
    setTable([...newTable]);
    socket.emit('playerPlayed', { gameId, play: (3 * x + y), userId: user.id });
    changeTurn();
  };
  // console.log(turn);
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="flex flex-col gap-3 justify-between bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 h-64 w-60 md:h-96 md:w-96 m-10">
        {table.map((row, i) => (
          <div className="flex gap-3 justify-between" key={uuidv4()}>
            {row.map((btn, j) => (
              <button
                type="button"
                disabled={btn !== 0 || tableObj.winner === 1 || !turn}
                onClick={() => playedClick(i, j)}
                key={uuidv4()}
                className="bg-[#f1f2f4] h-20 w-20 text-3xl md:h-32 md:w-32 sm:text-5xl font-bold text-gray-700"
              >
                {icons[btn]}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <ResetButton
          setTable={setTable}
          setWinner={setWinner}
          params={params}
          user={user}
          setTurn={setTurn}
        />
        <Button onPress={() => {
          router.push('/play');
        }}
        >
          Exit

        </Button>
      </div>
      {winner !== 0 && <EndGame winner={winner} /> }
    </div>
  );
}

export default Table;
