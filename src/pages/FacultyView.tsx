import { Grid } from "@mui/material";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { getAverageGradesFaculty } from "../services/AverageGrades";
import { useAuth } from "../auth/AuthProvider";
import TableComponent from "../components/GradesTable";
import { ColumnConfig } from "../types/GeneralTypes";

const FacultyView: React.FC<{}> = ({}) => {
    const auth = useAuth();
    const token = auth.getAccessToken();

    const [averageGradesData, setAverageGradesData] = useState<any>(null)

    useEffect(() => {
        const fetchAverageGradesData = async () => {
          const data = await getAverageGradesFaculty(token);
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
                <Grid sx={{height: '100%', mt: 5}}>
                    <TableComponent name="Docentes de la facultad de Ingeniería" columns={columns} data={averageGradesData} showActions={true} showSchoolFilter={true} showSubjectFilter={false}/>
                </Grid>
            </SideBar>
            
        </>
    )
}

export default FacultyView;
