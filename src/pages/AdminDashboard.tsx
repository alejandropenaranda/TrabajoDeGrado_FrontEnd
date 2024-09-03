import { Grid } from "@mui/material";
import SideBar from "../components/SideBar";

export default function AdminDashboard() {

    return (
        <>
            <SideBar>
                <Grid sx={{height: '100vh'}}>
                    <h1>Dashboard de Administrador</h1>
                </Grid>
            </SideBar>
            
        </>
    )
}