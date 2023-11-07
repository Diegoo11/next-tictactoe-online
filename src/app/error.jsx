'use client';

import Image from 'next/image';
import error from './assets/error.svg';
import ButtonLink from './components/ButtonLink';

export default function ErrorNotFound() {
  return (
    <div className="mb-8 w-40 md:w-60 flex flex-col justify-center items-center gap-6">
      <Image
        className="bg-[#fbfafb] rounded-md p-4"
        src={error}
        alt="error"
      />
      <span className="text-black font-semibold text-lg text-center flex items-center">
        Play code not found, please create a new game
      </span>
      <ButtonLink path="/">
        Home
      </ButtonLink>
    </div>
  );
}
