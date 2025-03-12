import {IUser} from "../../../interfaces";
import {FC} from "react";
import dayjs from "dayjs";

interface IProps {
    users: IUser[];
}

const Users: FC<IProps> = ({users}) => {
    return (
        <div>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id} style={{marginBottom: "10px", padding: "10px", border: "1px solid #ddd"}}>
                            <p><strong>ID:</strong> {user.id}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Name:</strong> {user.profile?.name ?? "N/A"}</p>
                            <p><strong>Surname:</strong> {user.profile?.surname ?? "N/A"}</p>
                            <p><strong>Active:</strong> {user.is_active ? "Yes" : "No"}</p>
                            <p><strong>Last
                                Login:</strong> {user.last_login ? dayjs(user.last_login).format("MMMM DD, YYYY ") : ""}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export {Users};
