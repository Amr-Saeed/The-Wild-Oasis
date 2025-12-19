import Link from "next/link";
import Image from "next/image";

//? we can import the image first so that next can analyze it and optimize it so we don't need to set width and height manually
//? and now image will get resized depending on the device screen size 
import logoSrc from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* //! the Image comp from next do four things:
      // 1. Optimizes the image by serving it in modern formats like WebP when supported by the browser.
      // 2. prevent layout shifts as it forces us to set width and height
      // 3. Optimizes the image for different screen sizes and device types.
      // 4. it lazy loads the image by default to improve performance */}
      <Image src={logoSrc} alt="The Wild Oasis logo" width="60" height="60" quality={100} />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
