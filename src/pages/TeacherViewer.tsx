import React from "react";
import { Grid } from "@mui/material";
import SideBar from "../components/SideBar";
import { useAuth } from "../auth/AuthProvider";
import MyTabs from '../components/TabPanel';
import { useParams, useLocation } from "react-router-dom";

const TeacherViewer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation(); // Hook para obtener el estado enviado
    const auth = useAuth();
    const token = auth.getAccessToken();

    // Convierte el id a un número y maneja el caso de que sea undefined
    const numericId = id ? parseInt(id, 10) : null;

    // Obtén el nombre del estado
    const nombre = location.state?.nombre as string | undefined;

    console.log("token enviado:", token);

    return (
        <>
            <SideBar>
                <Grid>
                    {numericId !== null ? (
                        <>
                            <h1>Docente {nombre}</h1>
                            <MyTabs token={token} id={numericId} />
                        </>
                    ) : (
                        <p>Error: ID inválido</p>
                    )}
                </Grid>
            </SideBar>
        </>
    );
};

export default TeacherViewer;