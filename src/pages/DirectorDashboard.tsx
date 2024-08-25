import { Grid } from "@mui/material";
import SideBar from "../components/SideBar";
import{ User } from "../types/types";

export default function DirectorDashboard() {

    const user = JSON.parse(localStorage.getItem("user") || '{}') as User;

    return (
        <>
            <SideBar>
                <Grid>
                    <h1>Director dashboard</h1>
                </Grid>
            </SideBar>
            
        </>
    )
}