//! if you need to make /cabins/test easy just make a folder called cabins that has page.js inside
//! then folder called test inside cabins and then page.js inside test

import Navigation from "@/app/_components/Navigation";
import CabinCard from "@/app/_components/CabinCard";
import CabinsList from "../_components/CabinsList";
import { Suspense } from "react";
import Loading from "../loading";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";


/* //? just he gives an example by making a client component called counter and it works with each state
   ? also he says and what we know is the props is the bridge between server and client components
   ? so we can make a server component that fetches data and then pass the data as props to the client component
 */

// export const revalidate = 15; //? revalidate the data every 15 seconds
export const metadata = {
    title: "Cabins",
};
export default async function Cabins({ searchParams }) {

    //! see we can directly fetch data from here because it's a server component not using any hooks like useEffect or useState
    //! also the data now is cached by default unless you specify otherwise
    //! as you see the console.log comes in the terminal and in the browser console it writes to you server: then the data
    // const res = await fetch("https://jsonplaceholder.typicode.com/users");
    // const data = await res.json();
    // console.log(data);

    const params = await searchParams;

    const filter = params?.capacity ?? "all"


    return (
        <div>
            <h1 className="text-4xl mb-5 text-accent-400 font-medium">
                Our Luxury Cabins
            </h1>
            <p className="text-primary-200 text-lg mb-10">
                Cozy yet luxurious cabins, located right in the heart of the Italian
                Dolomites. Imagine waking up to beautiful mountain views, spending your
                days exploring the dark forests around, or just relaxing in your private
                hot tub under the stars. Enjoy nature&apos;s beauty in your own little home
                away from home. The perfect spot for a peaceful, calm vacation. Welcome
                to paradise.
            </p>

            {/* //! now if you want when the data is coming the part that contains the cabins only to show a loading state we use suspense
            //! so we wrap that part in suspense and give it a fallback component that will be shown while the data is coming
            //! here we use the Loading component that we made in app/loading.js so it works globally for all the loading states in the app folder
            //! also note that suspense works only with server components not client components */}
            <div className="flex justify-end mb-8">
                <Filter />
            </div>
            {/* //! this key={filter} is important to remount the component when the filter changes so that the new filter is applied */}
            <Suspense fallback={<Spinner />} key={filter}>
                <CabinsList filter={filter} />
                <ReservationReminder />
            </Suspense>
        </div>
    );
}