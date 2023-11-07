export default function Triangle({ invisible }) {
  if (invisible) {
    return (
      <div className="w-10 overflow-hidden inline-block m-2">
        <div className=" h-5 w-5 bg-transparent -rotate-45 transform origin-top-left" />
      </div>
    );
  }
  return (
    <div className="w-10 overflow-hidden inline-block m-2 animate-bounce animate-infinite">
      <div className=" h-5 w-5 bg-gray-600 -rotate-45 transform origin-top-left" />
    </div>
  );
}
