
//! or another solution is to put each data fetch in a separate component so that the user can see the page layout and some data while other data is still loading 
//! and then we will use Streaming using Suspense to show loading states for each part while the data is coming

import DateSelector from "@/app/_components/DateSelector"
import ReservationForm from "@/app/_components/ReservationForm"
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

async function Reservations({ cabin }) {
    const session = await auth();
    const [settings, bookedDates] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(cabin.id),
    ]);

    return (
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
            <DateSelector cabin={cabin} settings={settings} bookedDates={bookedDates} />
            {session?.user ? <ReservationForm cabin={cabin} user={session.user} /> : <LoginMessage />}
        </div>
    )
}

export default Reservations
