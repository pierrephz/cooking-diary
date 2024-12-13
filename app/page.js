import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col gap-3 justify-center">
      <div className="text-center text-2xl font-semibold">Hello!</div>
      <div className="text-center text-base">
        <p>
          This is the <span className="underline">Cooking History</span> app v0
        </p>
      </div>
    </div>
  );
}
