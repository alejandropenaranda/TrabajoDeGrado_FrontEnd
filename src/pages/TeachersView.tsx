import { Grid } from "@mui/material";
import SideBar from "../components/SideBar";
import{ User } from "../types/types";

export default function TeachersView() {

    const user = JSON.parse(localStorage.getItem("user") || '{}') as User;

    return (
        <>
            <SideBar>
                <Grid>
                <h1>Teachers View</h1>
                </Grid>
            </SideBar>
            
        </>
    )
}