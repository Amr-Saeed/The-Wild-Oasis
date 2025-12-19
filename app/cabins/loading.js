import Spinner from "@/app/_components/Spinner";

// Now this loading will be shown only at the route cabins and it's subroutes like cabins/id etc
function Loading() {
    return (
        <div className="grid items-center justify-center">
            <Spinner />
            <p className="text-xl text-primary-200 ">Loading cabins Data...</p>
        </div>
    )
}
export default Loading
