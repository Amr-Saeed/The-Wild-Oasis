//! each next app must contain a layout which is the component that wraps all pages and appears in all of them

import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

//! as this is the wrap for the entire app so we will import global css here
import "@/app/_styles/globals.css";

//! here it's a wrapper for the whole page so it must contain html and body tags

//! it's easy now to import fonts from google fonts by next

import { Josefin_Sans } from "next/font/google"; //? this josefin sans is a function that we can call to get the font
import Header from "@/app/_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

//! now we can use the font variable in our className to apply the font to the entire app
const josefinSans = Josefin_Sans({
  subsets: ["latin"], //? this is for the characters we want to support
  display: "swap", //? this will make the font load faster by swapping it with a system font until the custom font is loaded
});

console.log(josefinSans); //! we will use the className property from this object to apply the font to our app


//! it's easy to make the icon by only grap the  picture put it in the app folder and name it icon and that's it
export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "The Wild Oasis",
  }
  , description: "Explore the beauty of wildlife at The Wild Oasis.",
};

//! the children here fot the layout is the page that is currently being rendered like if am going to /about the children will be the about page component
//! also it's a convention to name this component RootLayout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-primary-950  text-primary-100 min-h-screen flex flex-col antialiased ${josefinSans.className}`}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full"><ReservationProvider >{children}</ReservationProvider></main>

        </div>
      </body>
    </html>
  );
}
