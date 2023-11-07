import Triangle from './Triangle';

export default function UserProfile({ src, username, turn }) {
  return (
    <div className="bg-[#fbfafb] flex flex-col justify-center items-center my-10 shadow-lg">
      {turn ? <Triangle /> : <Triangle invisible />}
      <div className="bg-[#fbfafb] rounded-md p-4 w-24 sm:w-40 lg:w-60">
        <img src={src} alt="profile" />
      </div>
      <span className="text-black font-semibold text-xl text-center w-full flex justify-center">
        {username}
      </span>
    </div>
  );
}
