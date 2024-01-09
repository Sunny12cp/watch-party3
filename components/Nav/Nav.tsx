import { useRouter } from "next/router";
import LinkInput from "./LinkInput";
import LeaveRoom from "./LeaveRoom";

function Nav() {
    const router = useRouter();

    return (
        <nav className="bg-black py-5 flex items-center justify-between px-20">
            {/* <img alt="logo" /> */}
            <h1 className="text-neutral-200 text-xl font-bold">WATCH PARTY 🎉</h1>
            <LinkInput />
            <div className="flex items-center gap-4">
                <h1 className="text-neutral-200 bg-neutral-800 rounded-sm px-3 py-1">Room:&nbsp; {router.query.id}</h1>
                <LeaveRoom />
            </div>
        </nav>
    );
}

export default Nav;
