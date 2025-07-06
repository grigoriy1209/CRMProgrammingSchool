import {FC} from "react";
import {useNavigate} from "react-router-dom";

const SessionExpired: FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login')
    }

    return (
        <div className= 'session-expired-container'>
            <h1>Your time finished</h1>
            <p>Your authorization time has expired. Please sign in again to continue</p>
            <button onClick={handleLogin}>Sign in</button>
        </div>
    );
};

export {SessionExpired};