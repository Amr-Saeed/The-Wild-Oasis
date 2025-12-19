'use server'

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth"
import { supabase } from "./supabase";

export async function signInAction() {
    //! here this function takes the provider and where to redirect after sign in
    await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {

    await signOut({ redirectTo: "/" });
}


//! we accept formData from the action in the form and this formData is a web API FormData object that contain methods like get and so on
export async function updateGuestProfile(formData) {
    //! we need to check for authorization first 

    const session = await auth();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const nationalID = formData.get("nationalID"); //! here we get the nationalID from the form data

    const [nationality, countryFlag] = formData.get("nationality").split("%");

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
        throw new Error(
            "Invalid National ID number. It should be 6-12 alphanumeric characters."
        );
    }
    const updateData = { nationality, countryFlag, nationalID }

    const { data, error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.id)


    if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
    }

    //! so this make sure that the profile page is revalidated after updating the profile (revalidating means fetching the new data from the server and updating the cache with the new data)
    revalidatePath("/account/profile"); //! revalidate the profile page to reflect the changes
}

//! similarly we can create an action to update booking details

export async function deleteReservation(bookingId) {
    const session = await auth();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

    if (error) {
        console.error(error);
        throw new Error('Booking could not be deleted');
    }

    //! and always rememebr if you need the ui to reflect the changes after performing a server action you need to revalidate the path
    revalidatePath("/account/reservations");

}