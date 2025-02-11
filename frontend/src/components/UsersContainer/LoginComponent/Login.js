import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {authService} from "../../../services/authService";

const Login = () => {
    const {handleSubmit, register} = useForm();
    const navigate = useNavigate();

    const login = async (user) => {
        await authService.login(user)
        navigate('/application')
    }

    return (
        <form onSubmit={handleSubmit(login)}>
            <input type="text" placeholder={'email'}{...register('email')}/>
            <input type="password" placeholder={'password'}{...register('password')}/>
            <button type="submit">Login</button>
        </form>
    );
};

export {Login};