import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider.tsx";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Avatar,
    Typography,
    TextField,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { API_URL } from "../auth/constants.ts";
import { AuthResponse, AuthResponseError } from "../types/Authtypes.ts";

export default function Login() {

    const auth = useAuth();
    const goTo = useNavigate();

    if (auth.isAuthenticated) {
        return <Navigate to='/' />;
    }
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorResponse, setErrorResponse] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        setTimeout(() => setErrorResponse(""), 3000);
        return;
    }, [errorResponse]);


    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setAlertMessage("Todos los campos son obligatorios");
            setTimeout(() => setAlertMessage(""), 3000);
            return;
        }

        if (!validateEmail(email)) {
            setAlertMessage("Por favor, ingrese un correo válido");
            setTimeout(() => setAlertMessage(""), 3000);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (response.ok) {
                setErrorResponse("");
                const json = (await response.json()) as AuthResponse;

                if (json.token) {
                    auth.saveUser(json);
                    const user = json.user;
                    goTo('/');
                    if (user.is_admin) {
                        goTo('/admin-dashboard');
                    } else if (user.is_director) {
                        goTo('/director-dashboard');
                    } else if (user.is_profesor) {
                        goTo('/teacher-view');
                    }
                }

            } else {
                const json = (await response.json()) as AuthResponseError;
                setErrorResponse(json.error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <Grid
                container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh"
                }}
            >
                <Typography variant="h4" sx={{ mb: 6, color:'#5b5b5b'}}>Sistema de análisis de evaluaciones docente</Typography>
                <Avatar sx={{ m: 1, bgcolor: "#ff0000" }}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">Ingreso</Typography>

                <Grid item sx={{ mt: 1 }}>
                    {!!alertMessage && (
                        <Alert variant="outlined" severity="error" sx={{ mt: "10px" }}>
                            {alertMessage}
                        </Alert>
                    )}
                    {!!errorResponse && (
                        <Alert variant="outlined" severity="error" sx={{ mt: "10px" }}>
                            {errorResponse}
                        </Alert>
                    )}

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo electrónico"
                        name="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        name="password"
                        label="Contraseña"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            bgcolor: "#ff0000",
                            "&:hover": { backgroundColor: "#882424" },
                        }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
