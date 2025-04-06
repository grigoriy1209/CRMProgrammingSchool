import {IUser} from "../../../interfaces";
import {FC} from "react";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {Pagination} from "../../OrderContainer";

interface IProps {
    users: IUser[];
}

const Users: FC<IProps> = ({users}) => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(state => state.orders.orders)

    return (
        <div>
            <p> Order statistic</p>
             <p>{}</p>
            <button >CREATE MANAGER</button>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id} style={{marginBottom: "10px", padding: "10px", border: "1px solid #ddd"}}>
                            <p><strong>ID:</strong> {user.id}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Name:</strong> {user.profile?.name ?? "N/A"}</p>
                            <p><strong>Surname:</strong> {user.profile?.surname ?? "N/A"}</p>
                            <p><strong>Is_Active:</strong> {user.is_active ? "True" : "False"}</p>
                            <p><strong>Last
                                Login:</strong> {user.last_login ? dayjs(user.last_login).format("MMMM DD, YYYY"):""}
                            </p>
                            <button>ACTIVATE</button>
                            <button>BAN</button>
                            <button>UNBAN</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>not users</p>
            )}
            <Pagination/>
        </div>
    );
};
export {
    Users
}