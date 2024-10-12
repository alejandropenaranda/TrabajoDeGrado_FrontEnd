import { Grid } from "@mui/material";
import SideBar from "../components/SideBar";
import { useAuth } from "../auth/AuthProvider";
import WelcomeUserCard from "../components/WelcomeUser";
import FileUploadComponent from "../components/GradesUploader";
import { uploadQuantitativeGrades, uploadQualitativeGrades } from "../services/UploadGrades";
import { getAverageGradesAllSchools } from "../services/AverageGrades";
import { useEffect, useState } from "react";
import SchoolsChart from "../components/SchoolsChart";
import { getFacSchoolAverageGrades } from "../services/FacSchoolAverageGrades";


const AdminDashboard: React.FC = () => {
    
    const auth = useAuth();
    const user = auth.getUser();
    const token = auth.getAccessToken();

    const [facSchoolAverageGradesData, setFacSchoolAverageGradesData] = useState<any>(null);
    const [SchoolsAverageGradesData, setSchoolAverageGradesData] = useState<any>(null);

    useEffect(() => {
        if (user) {
            const fetchSchoolsAverageGradesData = async () => {
                const data = await getAverageGradesAllSchools(token);
                setSchoolAverageGradesData(data);
            };
    
            const fetchFacSchoolAverageGradesData = async () => {
                const data = await getFacSchoolAverageGrades(token, user.escuela.id);
                setFacSchoolAverageGradesData(data);
            };
    
            fetchFacSchoolAverageGradesData();
            fetchSchoolsAverageGradesData();
        }
    }, [token, user]);

    if (!user) {
        return <p>User not found</p>;
    }

    const helpMessageQuali = "Los archivos de calificaciones cualitativas deben contener las columnas: 'SEMESTRE', 'DOCENTE', 'CEDULA', 'ESCUELA', 'COMENTARIO', 'MATERIA' y 'CODIGO_MATERIA' para su correcto procesamiento. Ademas no deben haber informaciones faltantes para ningun registro. Si alguno de los comentarios sobrepasa los 2050 caracteres no sera tenido en cuenta durante el procesamiento."

    const helpMessageQuanti = "Los archivos de calificaciones cuantitativas deben contener las columnas: 'SEMESTRE', 'DOCENTE', 'CEDULA', 'ESCUELA', 'PROM_PREGUNTA9', 'PROM_PREGUNTA10', 'PROM_PREGUNTA11', 'PROM_PREGUNTA12', 'PROM_PREGUNTA13', 'PROM_PREGUNTA14',  'PROM_PREGUNTA15', 'PROM_PREGUNTA16', 'PROM_PREGUNTA17', 'PROM_PREGUNTA18', 'PROM_PREGUNTA19', 'PROM_PREGUNTA20', 'PROM_DOCENTE', 'MATERIA' y 'CODIGO_MATERIA' para su correcto procesamiento. Ademas no deben haber informaciones faltantes para ningun registro."

    return (
        <>
            <SideBar>
                <Grid container spacing={1} direction={'row'} sx={{ p: 4, height: '100vh' }}>
                    {/* Primera fila */}
                    <Grid item xs={12} md={6}>
                        <WelcomeUserCard token={token} nombre={user.nombre} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {facSchoolAverageGradesData && SchoolsAverageGradesData && (
                            <SchoolsChart schoolData={facSchoolAverageGradesData} data={SchoolsAverageGradesData} />
                        )}
                    </Grid>

                    {/* Segunda fila */}
                    <Grid item xs={12} md={6}>
                        <FileUploadComponent token={token} title={"Subir Calificaciones cualitativas"} helpMessage={helpMessageQuali} uploadService={uploadQualitativeGrades} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FileUploadComponent token={token} title={"Subir Calificaciones cuantitativas"} helpMessage={helpMessageQuanti} uploadService={uploadQuantitativeGrades} />
                    </Grid>
                </Grid>
            </SideBar>
        </>
    )
}

export default AdminDashboard;