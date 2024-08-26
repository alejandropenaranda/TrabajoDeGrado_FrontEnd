import { Grid } from "@mui/material";
import SideBar from "../components/SideBar";
import{ User } from "../types/Authtypes";

export default function Home() {

    const user = JSON.parse(localStorage.getItem("user") || '{}') as User;

    return (
        <>
            <SideBar>
                <Grid>
                    <h1>   bienvenido al Home {user.nombre}</h1>
                </Grid>
            </SideBar>
            
        </>
    )
}