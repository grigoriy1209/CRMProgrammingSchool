import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../services/authService"

const Login = () => {
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();

    const login = async (user) => {
        await authService.login(user);
        navigate("/application");
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit(login)}>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Email"
                        {...register("email")}

                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password")}

                    />
                </div>
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export { Login };
