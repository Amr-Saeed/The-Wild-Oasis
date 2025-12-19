//! we put it here in the app folder so it works globally for all the pages that are loading
//! even if we are at cabins/test/1/23 it will work because it's in the app folder

export default function Loading() {
    return <p>Loading.....</p>;
}