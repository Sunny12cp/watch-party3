import { useRouter } from "next/router";
import LinkInput from "../ui/Inputs/LinkInput";

function Nav() {
    const router = useRouter();

    return (
        <nav>
            <LinkInput />
            <div>
                <h1>Room code: {router.query.id}</h1>
            </div>
        </nav>
    );
}

export default Nav;
