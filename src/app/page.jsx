import ButtonLink from '@/app/components/ButtonLink';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-xl">Te perdiste?</h1>
      <ButtonLink path="/play">
        Ir al juego
      </ButtonLink>
    </div>
  );
}
