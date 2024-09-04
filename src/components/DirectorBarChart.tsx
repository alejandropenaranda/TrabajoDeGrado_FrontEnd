import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Grid, Typography } from '@mui/material';
import { FacSchoolGradesResponse } from '../types/DirectorTypes';

interface TeacherGradesBarChartProps {
  data: FacSchoolGradesResponse;
  nombre: string;
}

const TeacherGradesBarChart: React.FC<TeacherGradesBarChartProps> = ({ data, nombre }) => {
  const FacultyGrade = data.promedio_facultad;
  const SchoolGrade = data.promedio_escuela;

  const Chartnames = [
    'Promedio general de la Escuela',
    'Promedio general de la Facultad'
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
              data: [FacultyGrade, SchoolGrade],
            },
          ]}
          height={290}
          grid={{ horizontal: true }}
          xAxis={[{
            data: Chartnames,
            scaleType: 'band',
            colorMap: {
              type: 'ordinal',
              values: Chartnames,
              colors: ['red', '#2F4858'],
            }
          }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </Grid>
    </Grid>
  );
}

export default TeacherGradesBarChart;