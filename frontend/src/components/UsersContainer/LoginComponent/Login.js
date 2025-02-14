import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {authService} from "../../../services/authService";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {styled} from "@mui/system";

const StyledForm = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
});

const Login = () => {
    const {handleSubmit, register} = useForm();
    const navigate = useNavigate();

    const login = async (user) => {
        await authService.login(user);
        navigate("/application");
    };

    return (
        <Container maxWidth="xs">
            <StyledForm component="form" onSubmit={handleSubmit(login)}>
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    {...register("email")}
                />
                <TextField
                    label="Пароль"
                    type="password"
                    variant="outlined"
                    fullWidth
                    {...register("password")}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    LOGIN
                </Button>
            </StyledForm>
        </Container>
    );
};

export {Login};
