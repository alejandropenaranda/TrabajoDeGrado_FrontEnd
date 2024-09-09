import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { ChartContainer, ChartsTooltip, ChartsXAxis, ChartsYAxis } from '@mui/x-charts';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot } from '@mui/x-charts/LineChart';
import { FacSchoolGradesResponse, SchoolTeachersAvergaeGradesResponse } from '../types/DirectorTypes';
import { HighlightOutlined } from '@mui/icons-material';

interface SchoolTeachersChartProps {
  schoolData: FacSchoolGradesResponse;
  data: SchoolTeachersAvergaeGradesResponse;
}

const SchoolTeachersChart: React.FC<SchoolTeachersChartProps> = ({ data, schoolData }) => {
  const dataset = data.map((item) => ({
    docente: item.docente,
    cuantitativo: parseFloat(item.promedio_cuantitativo.toFixed(2)),
    cualitativo: parseFloat(item.promedio_cualitativo.toFixed(2)),
  }));

  const schoolAverageCuantitativo = new Array(dataset.length).fill(schoolData.promedio_escuela_cuantitativo.toFixed(2));
  const schoolAverageCualitativo = new Array(dataset.length).fill(schoolData.promedio_escuela_cualitativo.toFixed(2));

  const legendItems = [
    { label: 'Docente Cuantitativo', color: 'red' },
    { label: 'Docente Cualitativo', color: '#2F4858' },
    { label: 'Escuela Cuantitativo', color: 'blue' },
    { label: 'Escuela Cualitativo', color: 'green' },
  ];

  return (
    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: 'white',
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '10px', mt: '20px' }}>
          Promedios de calificaciones por docente
        </Typography>
        <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
          {legendItems.map((item) => (
            <Box key={item.label} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: item.color,
                  marginRight: '8px',
                }}
              />
              <Typography variant="body2">{item.label}</Typography>
            </Box>
          ))}
        </Box>
        <ChartContainer
          series={[
            {
              type: 'bar',
              data: dataset.map(item => item.cuantitativo),
              label: 'Docente Cuantitativo',
              color: 'red',
              highlightScope: { highlight: 'item', fade: 'global' },
            },
            {
              type: 'bar',
              data: dataset.map(item => item.cualitativo),
              label: 'Docente Cualitativo',
              color: '#2F4858',
              highlightScope: { highlight: 'item', fade: 'global' },
            },
            {
              type: 'line',
              data: schoolAverageCuantitativo,
              label: 'Escuela Cuantitativo',
              color: 'blue',
              highlightScope: { highlight: 'item', fade: 'global' },
            },
            {
              type: 'line',
              data: schoolAverageCualitativo,
              label: 'Escuela Cualitativo',
              color: 'green',
              highlightScope: { highlight: 'item', fade: 'global' },
            },
          ]}
          xAxis={[
            {
              data: dataset.map((item) => item.docente),
              scaleType: 'band',
              id: 'x-axis-id',
            },
          ]}
          yAxis={[
            {
              min: 0,
              max: 5,
              id: 'y-axis-id',
            },
          ]}
          width={1600}
          height={400}
        >
          <BarPlot />
          <LinePlot />
          <ChartsXAxis position="bottom" axisId="x-axis-id" />
          <ChartsYAxis axisId="y-axis-id" />
          <ChartsTooltip/>
        </ChartContainer>
      </Box>
    </Grid>
  );
};

export default SchoolTeachersChart;

// Solo falta el Highlight de los axis
