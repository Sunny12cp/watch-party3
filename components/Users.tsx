import { useSocketListener } from "@/hooks/useSocketListener";
import { useState } from "react";

function Users() {
    const [userList, setUserList] = useState<string[]>([]);

    useSocketListener("user join", (users) => setUserList(users));
    useSocketListener("user leave", (users) => setUserList(users));

    return (
        <div className="bg-blue-300">
            {userList.map((user: string, idx: number) => (
                <div key={idx}>{user}</div>
            ))}
        </div>
    );
}

export default Users;
