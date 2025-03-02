import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authServices } from "../../../services/authServices";
import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import {IAuth} from "../../../interfaces";

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
    const { handleSubmit, register, setError, formState: { errors, isSubmitting } } = useForm<IAuth>();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState<string | null>(null);

    const login = async (user: { email: string, password: string }) => {
        try {
            setServerError(null);
            await authServices.login(user);
            navigate("/application");
        } catch (err: any) {
            console.log(err);
            setServerError("Невірний email або пароль");


            if (err.response?.status === 400) {
                setError("email", { message: "Невірний email або пароль" });
                setError("password", { message: "Перевірте пароль" });
            }
        }
    };

    return (
        <Container maxWidth="xs">
            <StyledForm as="form" onSubmit={handleSubmit(login)}>
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth

                    {...register("email", { required: "Email є обов'язковим" })}
                />
                <TextField
                    label="Пароль"
                    type="password"
                    variant="outlined"
                    fullWidth

                    {...register("password", { required: "Пароль є обов'язковим" })}
                />
                {serverError && <Typography color="error">{serverError}</Typography>}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isSubmitting}
                >
                    Login
                </Button>
            </StyledForm>
        </Container>
    );
};

export { Login };
