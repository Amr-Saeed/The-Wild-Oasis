
//! now we have a server component

import Navigation from "@/app/_components/Navigation";
import { auth } from "../_lib/auth";

//! Note react hooks like useState or useEffect cannot be used in server components

export const metadata = {
    title: "Account",
};
export default async function Account() {

    const session = await auth(); //! get the session data using the auth function

    const firstName = session?.user?.name?.split(" ")[0] || "Guest";
    return (
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
            Welcome, {firstName}</h2>
    );
}