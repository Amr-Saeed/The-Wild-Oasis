import Cabin from "@/app/_components/Cabin";
import Reservations from "@/app/_components/Reservations";
import Spinner from "@/app/_components/Spinner";
import TextExpander from "@/app/_components/TextExpander";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Suspense } from "react";

// PLACEHOLDER DATA
const cabinss = {
    id: 89,
    name: "001",
    maxCapacity: 2,
    regularPrice: 250,
    discount: 0,
    description:
        "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
    image:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg",
};


//! this helps us in generating the static params for the dynamic routes
export async function generateStaticParams() {
    const cabins = await getCabins();

    const cabinIds = cabins.map((cabin) => ({ cabinId: cabin.id.toString() }));

    console.log(cabinIds);
    return cabinIds;
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params;

    const { name } = await getCabin(resolvedParams.cabinId);

    return {
        title: `Cabin ${name}`,
    };
}

//! now easily we can get the parameter from the url using the props that nextjs gives to us (because the convention is that the folder name with [] means it's a dynamic route parameter)
export default async function Page({ params }) {

    // make await for the params itself like const resolvedParam = await params; then use it 


    const resolvedParams = await params;
    const cabinID = resolvedParams.cabinId;

    //! we can make the fetch like this but if each one of those apis takes 2 seconds then the user will wait for 6 seconds to see anything
    const cabin = await getCabin(cabinID);
    // const settings = await getSettings();
    // const bookedDates = await getBookedDatesByCabinId(cabinID);

    //! so another solution is to make those fetches in parallel using Promise.all  now they work on parallel so we will take only 2 seconds
    // const [cabin, settings, bookedDates] = await Promise.all([
    //     getCabin(cabinID),
    //     getSettings(),
    //     getBookedDatesByCabinId(cabinID),
    // ]);

    //! or another solution is to put each data fetch in a separate component so that the user can see the page layout and some data while other data is still loading 
    //! and then we will use Streaming using Suspense to show loading states for each part while the data is coming


    if (!cabin) {
        return <p>Cabin not found</p>;
    }

    console.log(cabin);


    // const cabinID = await params.cabinId;


    // const cabin = await getCabin(cabinID);
    // if (!cabin) {
    //     return <p>Cabin not found</p>;
    // }

    // console.log(cabin);

    // const { name, maxCapacity, regularPrice, discount, image, description } = cabinss;


    return (
        <div className="max-w-6xl mx-auto mt-8">
            <Cabin cabin={cabin} />

            <div>
                <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
                    Reserve {cabin.name} today. Pay on arrival.
                </h2>
                <Suspense fallback={<Spinner />}>
                    <Reservations cabin={cabin} />
                </Suspense>
            </div>
        </div>
    );
}
