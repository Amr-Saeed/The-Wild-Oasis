import CabinCard from "./CabinCard"
import { getCabins } from "../_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

async function CabinsList({ filter }) {



    noStore(); //? this makes sure that the data is not cached and is fetched on every request
    const cabins = await getCabins();

    let fitleredCabins;


    if (filter === "all") fitleredCabins = cabins
    if (filter === "small") {
        fitleredCabins = cabins.filter(cabin => cabin.maxCapacity <= 3);
    }
    if (filter === "medium") {
        fitleredCabins = cabins.filter(cabin => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7);

    }
    if (filter === "large") {
        fitleredCabins = cabins.filter(cabin => cabin.maxCapacity >= 8);

    }
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {fitleredCabins.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    )
}

export default CabinsList
