import { Grid } from "@mui/material";
import SideBar from "../components/SideBar";
import { useAuth } from "../auth/AuthProvider";
import MyTabs from '../components/TabPanel'

export default function TeachersView() {

    const auth = useAuth();
    const user = auth.getUser();
    const token = auth.getAccessToken();

    if (!user) {
        return <p>User not found</p>;
    }

    return (
        <>
            <SideBar>
                <Grid>
                    <h1>Docente {user.nombre}</h1>
                        <MyTabs token={token} id={user.id}/>
                </Grid>
            </SideBar>
        </>
    );
}