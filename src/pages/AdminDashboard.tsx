import { Grid } from "@mui/material";
import SideBar from "../components/SideBar";
import { useAuth } from "../auth/AuthProvider";
import WelcomeUserCard from "../components/WelcomeUser";


const AdminDashboard: React.FC<{}> = ({}) => {
    
    const auth = useAuth();
    const user = auth.getUser();
    const token = auth.getAccessToken();

    if (!user) {
        return <p>User not found</p>;
    }

    return (
        <>
            <SideBar>
                <Grid container spacing={3} direction={'column'} sx={{p:4, height: '100vh'}}>

                    <h2>Dashboard de Administrador</h2>
                    <Grid item xs={4}>
                        <WelcomeUserCard nombre={user.nombre}/>
                    </Grid>
                    
                </Grid>
            </SideBar>
            
        </>
    )
}

export default AdminDashboard;