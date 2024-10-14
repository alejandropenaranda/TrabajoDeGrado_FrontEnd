import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { ChartResponse } from '../types/TeacherTypes';
import { Grid, Typography } from '@mui/material';

interface TeacherGradesBarChartProps {
  data: ChartResponse;
  nombre: string;
}

const TeacherGradesBarChart: React.FC<TeacherGradesBarChartProps> = ({ data, nombre }) => {
  const FacultyGrade = data.promedio_facultad;
  const SchoolGrade = data.promedio_escuela;
  const TeacherGrade = data.promedio_docente;

  const Chartnames = [
    'Promedio docentes \n de la facultad',
    'Promedio docentes \n de la escuela',
    'Promedio del docente'
  ];

  const titleStyles = {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '16px',
  };

  return (
    <Grid container sx={{
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      backgroundColor: 'white'
    }}>
      <Grid item xs={12}>
        <Typography variant="h6" sx={titleStyles}>
          {nombre}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <BarChart
          series={[
            {
              data: [FacultyGrade, SchoolGrade, TeacherGrade],              
            },
          ]}
          height={372}
          grid={{ horizontal: true }}
          xAxis={[{
            data: Chartnames,
            scaleType: 'band',
            categoryGapRatio: 0.7,
            colorMap: {
              type: 'ordinal',
              values: Chartnames,
              colors: ['red', '#6D4B9A', '#2F4858'],       
            }
          }]}
          yAxis={[
            {
              min: 0,
              max: 5,
            }
          ]}
          margin={{ top: 10, bottom: 40, left: 30, right: 10 }}
        />
      </Grid>
    </Grid>
  );
}

export default TeacherGradesBarChart;
