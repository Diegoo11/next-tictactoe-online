export default function EndGame({ winner }) {
  return (
    <div className="
    animate-jump animate-twice animate-duration-[400ms] animate-delay-0 animate-ease-in-out animate-normal
    animate-fill-forwards w-[310px] text-4xl md:text-8xl md:w-[700px] right-0 left-0 absolute top-96 bottom-96 m-auto
    bg-white rounded-lg p-4 text-gray-900
      flex justify-center items-center min-h-fit shadow-xl"
    >
      <div className="p-4 flex justify-center items-center border-gray-900 border-solid border-8 rounded-lg">
        <span className="">
          Gano Player
          {' '}
          {winner}
          !
        </span>
      </div>
    </div>
  );
}
