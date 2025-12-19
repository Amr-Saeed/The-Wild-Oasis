"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"


function Filter() {
    //! here we need to get the search params from the URL so that we use the useSearchParams hook
    //! this searchparams is readonly so we cannot modify it directly so we will create a new URLSearchParams object to modify it (it's a copy of the original one)
    const searchParams = useSearchParams();
    //! to programmatically navigate we use the useRouter hook
    const router = useRouter();
    //! now we need to get the current pathname
    const pathname = usePathname();

    const activeFilter = searchParams.get("capacity") || "all";
    function handleFilter(filter) {


        //! now to get this data in the URL we will use a web API called URLSearchParams 
        const params = new URLSearchParams(searchParams.toString())
        //! set the filter param to the selected filter (so now we made the capacity to equal to the filter value)
        params.set("capacity", filter)
        //! now we need to programmatically navigate to the new URL with the updated search params
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })

    }
    return (
        <div className="border border-primary-800 flex">
            {/* <button onClick={() => handleFilter("all")} className="px-5 py-2 hover:bg-primary-700 cursor-pointer">All Cabins</button>
            <button onClick={() => handleFilter("small")} className="px-5 py-2 hover:bg-primary-700 cursor-pointer">1&mdash;3 guests</button>
            <button onClick={() => handleFilter("medium")} className="px-5 py-2 hover:bg-primary-700 cursor-pointer">4&mdash;7 guests</button>
            <button onClick={() => handleFilter("large")} className="px-5 py-2 hover:bg-primary-700 cursor-pointer">8&mdash;12 guests</button> */}

            <Button handleFilter={handleFilter} filter="all" activeFilter={activeFilter}>All Cabins</Button>
            <Button handleFilter={handleFilter} filter="small" activeFilter={activeFilter}>1&mdash;3 guests</Button>
            <Button handleFilter={handleFilter} filter="medium" activeFilter={activeFilter}>4&mdash;7 guests</Button>
            <Button handleFilter={handleFilter} filter="large" activeFilter={activeFilter}>8&mdash;12 guests</Button>


        </div>
    )
}



function Button({ handleFilter, filter, children, activeFilter }) {
    return (
        <button onClick={() => handleFilter(filter)} className={`px-5 py-2 hover:bg-primary-700 cursor-pointer ${filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''}`}>
            {children}
        </button>
    )
}
export default Filter
