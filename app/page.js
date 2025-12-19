import Navigation from "@/app/_components/Navigation";
import Image from "next/image";
//! we statically import the image so we don't need to set width and height manually
import bg from "@/public/bg.png"
import Link from "next/link";

export default function Home() {
  return (
    <main className="mt-24">
      {/* //! this fill to make it like background image to take the whole screen
      // ! this object-top makes the position top so there is no shift of the image with resizing the screen
      // ! this placeholder blur makes the image be blurred while it's getting loaded it only works with statically imported images */}
      <Image fill placeholder="blur" quality={80} className="object-cover object-top" src={bg} alt="Mountains and forests with two cabins" />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
