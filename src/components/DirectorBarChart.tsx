import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { FacSchoolGradesResponse } from '../types/DirectorTypes';
import { Grid, Typography, Box } from '@mui/material';

interface DirectorBarChartProps {
  data: FacSchoolGradesResponse;
}

const chartSetting = {
  yAxis: [
    {
      min: 0,
      max: 5,
    },
  ],
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
      color: 'black', 
    },
    [`.${axisClasses.bottom} .${axisClasses.label}`]: {
      color: 'black', 
    },
  },
};

const valueFormatter = (value: number | null) => {
  if (value === null || value === undefined) {
    return 'N/A';
  }
  return value.toFixed(2);
};

const DirectorBarChart: React.FC<DirectorBarChartProps> = ({ data }) => {
  const FacultyGrade = data.promedio_facultad;
  const SchoolGrade = data.promedio_escuela;
  const CuantitativeFacultyGrade = data.promedio_facultad_cuantitativo;
  const CualitativeFacultyGrade = data.promedio_facultad_cualitativo;
  const CuantitativeSchoolGrade = data.promedio_escuela_cuantitativo;
  const CualitativeSchoolGrade = data.promedio_escuela_cualitativo;

  const dataset = [
    {
      category: 'Promedio General',
      Escuela: SchoolGrade,
      Facultad: FacultyGrade,
    },
    {
      category: 'Promedio Cualitativo',
      Escuela: CualitativeSchoolGrade,
      Facultad: CualitativeFacultyGrade,
    },
    {
      category: 'Promedio Cuantitativo',
      Escuela: CuantitativeSchoolGrade,
      Facultad: CuantitativeFacultyGrade,
    },
  ];

  const titleStyles = {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10px',
    mt: '20px'
  };

  return (
    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: 'white',
          width: '100%',
          maxWidth: '800px', 
          overflow: 'hidden',
        }}
      >
        <Typography variant="h6" sx={titleStyles}>
          Desempeño de la Escuela
        </Typography>
        <Box sx={{ height: 455 }}>
          <BarChart
            dataset={dataset}
            grid={{ horizontal: true }}
            xAxis={[{ scaleType: 'band', dataKey: 'category' }]}
            series={[
              { dataKey: 'Escuela', label: 'Escuela', color: 'red', valueFormatter },
              { dataKey: 'Facultad', label: 'Facultad', color: '#2F4858', valueFormatter },
            ]}
            {...chartSetting}
          />
        </Box>
      </Box>
    </Grid>
  );
}

export default DirectorBarChart;
