import { Grid } from "@mui/material";
import SideBar from "../components/SideBar";
import { ColumnConfig } from "../components/GradesTable";
import { useEffect, useState } from "react";
import { getAverageGradesSchool } from "../services/AverageGrades";
import { useAuth } from "../auth/AuthProvider";
import TableComponent from "../components/GradesTable";


const SchoolView: React.FC<{}> = ({}) => {
    const auth = useAuth();
    const user = auth.getUser();
    const token = auth.getAccessToken();

    if (!user) {
        return <p>User not found</p>;
    }

    const [averageGradesData, setAverageGradesData] = useState<any>(null)

    useEffect(() => {
        const fetchAverageGradesData = async () => {
          const data = await getAverageGradesSchool(token, user.escuela.id);
          setAverageGradesData(data);
        };
        fetchAverageGradesData();
      }, [ ]);


    const columns: ColumnConfig[] = [
        { headerName: 'Docente', fieldName: 'docente_nombre' },
        { headerName: 'Calificación cualitativa promedio', fieldName: 'promedio_cual' },
        { headerName: 'Calificación cuantitativa promedio', fieldName: 'promedio_cuant' },
        { headerName: 'Período', fieldName: 'periodo' },
        { headerName: 'Escuela', fieldName: 'escuela' },
    ];


    return (
        <>
            <SideBar>
                <Grid sx={{height: '100vh', mt: 5}}>
                    <TableComponent name = {`Docentes de la escuela de ${user.escuela.nombre}`} columns={columns} data={averageGradesData} showActions={true} showSchoolFilter={false} showSubjectFilter={false}/>
                </Grid>
            </SideBar>
            
        </>
    )
}

export default SchoolView;