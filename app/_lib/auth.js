import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";
import { email } from "zod";

const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        })
    ],

    callbacks: {
        authorized({ auth, request }) {
            //! here we can add custom logic to check if the user is authorized to access the requested path
            // return auth?.user? true : false; //! if there is a user in the auth object then return true else false

            //? or we can write it like this 
            return !!auth?.user; //! this will return true if there is a user else false (to convert anythoing to boolean we can use !!)
        },

        //! this callback function is like the middleware it works after the user enters his credentials and before creating the session (like before really signing in so it's used to check if the user data is already in the DB) 
        async signIn({ user, account, profile }) {
            try {
                const existinguser = await getGuest(user.email);

                if (!existinguser) {
                    await createGuest({ email: user.email, fullName: user.name });//! create a new user in the DB if not exists
                }

                return true; //! return true to allow sign in
            } catch (error) {
                return false; //! return false to deny sign in
            }
        },


        //! this callback function is called when a session is created (after sign in)
        async session({ session, token, user }) {
            const guest = await getGuest(session.user.email);
            if (guest) {
                session.user.id = guest.id; //! add the user id to the session object
            }
            return session;
        }


    },
    pages: {
        signIn: '/login'  //! if the user is not authorized then redirect to /login page
    }
}

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(authConfig);