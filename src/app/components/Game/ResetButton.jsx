import { Button } from '@nextui-org/react';
import { useUtils } from '@/app/providers/UtilsContext';
// import { useUser } from '../../context/UserContext';

export default function ResetButton({
  setTable, setWinner, params, user,
}) {
  const { gameId } = params;
  const { socket } = useUtils();

  const handdleReset = () => {
    socket.emit('reset', { gameId, userId: user.id });
    setTable([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    setWinner(0);
  };
  return (
    <Button
      onPress={handdleReset}
    >
      Reset
    </Button>
  );
}
