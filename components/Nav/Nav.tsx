import { useRouter } from "next/router";
import LinkInput from "./LinkInput";
import LeaveRoomButton from "./LeaveRoomButton";

function Nav() {
    const router = useRouter();

    return (
        <nav className="bg-neutral-950 py-5 flex items-center justify-between px-20 font-int_med">
            <img src="/watchpartylogo.png" className="w-52 -mr-10 opacity-95" alt="logo" />
            <LinkInput />
            <div className="flex items-center gap-4">
                <h1 className="text-neutral-200 bg-neutral-800 rounded-sm px-3 py-1">Room:&nbsp; {router.query.id}</h1>
                <LeaveRoomButton />
            </div>
        </nav>
    );
}

export default Nav;
