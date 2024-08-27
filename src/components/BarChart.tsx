import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { ChartResponse } from '../types/TeacherTypes';
import { Grid, Typography } from '@mui/material';

interface GradesBarChartProps {
  data: ChartResponse;
  nombre: string;
}

const GradesBarChart: React.FC<GradesBarChartProps> = ({ data, nombre }) => {
  const FacultyGrade = data.promedio_facultad;
  const SchoolGrade = data.promedio_escuela;
  const TeacherGrade = data.promedio_docente;

  console.log(FacultyGrade, SchoolGrade, TeacherGrade)

  const Chartnames =['Calificación promedio de los docentes de la facultad', 'Calificación promedio de los docentes de la escuela', 'calificación promedio del docente']
  return (
    <Grid>
      <Typography variant="h6">{nombre}</Typography>
      <BarChart
        series={[
            {
              data: [FacultyGrade, SchoolGrade, TeacherGrade],
            },
          ]}
        height={290}
        grid={{horizontal: true}}
        xAxis={[{ data: Chartnames,
            scaleType: 'band',
            colorMap: {
                type: 'ordinal',
                values: Chartnames,
                colors: ['red', '#6D4B9A', '#2F4858'],
              }
        }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </Grid>
  );
}

export default GradesBarChart;