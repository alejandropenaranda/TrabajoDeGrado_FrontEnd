import { Grid } from "@mui/material";
import SideBar from "../components/SideBar";
import { useAuth } from "../auth/AuthProvider";
import WordCloud from "../components/WordCloud";

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
                    <h1>Teachers View</h1>
                    <WordCloud token={token} id={user.id} />
                </Grid>
            </SideBar>
        </>
    );
}