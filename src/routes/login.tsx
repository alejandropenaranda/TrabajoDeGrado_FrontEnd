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
import { useState } from "react";
import { API_URL } from "../auth/constants.ts";
import { AuthResponse, AuthResponseError } from "../types/types.ts";

export default function Login() {

    const auth = useAuth();
    const goTo = useNavigate();

    if (auth.isAuthenticated) {
        return <Navigate to='/home' />;
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorResponse, setErrorResponse] = useState("");

    async function handleLogin (){
        
        try{
            const response = await fetch(`${API_URL}/login`,{
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            if (response.ok){
                console.log("Usuario logueado correctamente");
                setErrorResponse("");
                const json = (await response.json()) as AuthResponse
                
                if(json.token){
                    auth.saveUser(json);

                    const user = json.user
                    goTo('/home');
                    if (user.is_admin) {
                        goTo('/admin-dashboard');
                    } else if (user.is_director) {
                        goTo('/director-dashboard');
                    } else if (user.is_profesor) {
                        goTo('/teachers-view');
                    } else {
                        goTo('/home');
                    }
                }
  
            }else{
                console.log("Something went wrong");
                const json = (await response.json()) as AuthResponseError
                console.log(json)
                setErrorResponse(json.error);
            }
        }catch(error){
            console.log(error)
        }
    }


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
                <Avatar sx={{ m: 1, bgcolor: "#ff0000" }}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">Login</Typography>
                
                <Grid item sx={{ mt: 1 }}>
                    {!!errorResponse && <Alert variant="outlined" severity="error" sx={{ mt: "10px"}} >{errorResponse}</Alert>}
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