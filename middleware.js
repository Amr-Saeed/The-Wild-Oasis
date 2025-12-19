import { NextResponse } from "next/server";
import { auth } from "./app/_lib/auth";



//? this only for explanation
/*export function middleware(request) {
    // Middleware logic can be added here if needed in the future
    console.log("Middleware executed for request:", request.url);

    //! here this will redirect all requests to /about page so if we inside /reservations it will go to /about or /cabins will go to /about even in /about it self will go to /about
    //! so to handle this we need the matchers in the config below to only apply this middleware to specific paths
    return NextResponse.redirect(new URL("/about", request.url));
}
*/

//! now let's make a middleware for sign in to handle the authorization for the /account page

export const middleware = auth; //! now the auth function will handle the middleware logic and it will redirect to the sign in page if the user is not authenticated
export const config = {
    //! only apply this middleware to /account path so if am in /reservations or /cabins it will not redirect to /about page
    matcher: ["/account"]
}