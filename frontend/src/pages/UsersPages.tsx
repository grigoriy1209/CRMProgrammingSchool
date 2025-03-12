import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {useEffect} from "react";
import {userAction} from "../redux/slices/usersSlice";
import {Users} from "../components";

const UsersPages = () => {
    const dispatch = useAppDispatch();
    const {users,error} = useAppSelector(state => state.users);

    useEffect(() => {
        dispatch(userAction.loadUsers());

    }, []);


    return (
        <div>
            <Users users={users} />
        </div>
    );
};
export {UsersPages};