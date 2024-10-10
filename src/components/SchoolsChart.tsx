import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { ChartContainer, ChartsTooltip, ChartsXAxis, ChartsYAxis } from '@mui/x-charts';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartsAxisHighlight } from '@mui/x-charts/ChartsAxisHighlight';
import { SchoolsAvergaeGradesResponse } from '../types/AdminTypes';
import { FacSchoolGradesResponse } from '../types/DirectorTypes';

interface SchoolsChartProps {
  schoolData: FacSchoolGradesResponse;
  data: SchoolsAvergaeGradesResponse;
}

const SchoolsChart: React.FC<SchoolsChartProps> = ({ data, schoolData }) => {
    
  const dataset = data.map((item) => ({
    escuela: item.escuela,
    cuantitativo: parseFloat(item.promedio_cuantitativo.toFixed(2)),
    cualitativo: parseFloat(item.promedio_cualitativo.toFixed(2)),
  }));

  const FacAverageCuantitativo = new Array(dataset.length).fill(schoolData.promedio_facultad_cuantitativo.toFixed(2));
  const FacAverageCualitativo = new Array(dataset.length).fill(schoolData.promedio_facultad_cualitativo.toFixed(2));

  const legendItems = [
    { label: 'Escuela Cuantitativo', color: 'red' },
    { label: 'Escuela Cualitativo', color: '#2F4858' },
    { label: 'Facultad Cuantitativo', color: 'blue' },
    { label: 'Facultad Cualitativo', color: 'green' },
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
          Promedios de calificaciones por Escuela
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
              label: 'Escuela Cuantitativo',
              color: 'red',
              highlightScope: { highlight: 'item', fade: 'global' },
            },
            {
              type: 'bar',
              data: dataset.map(item => item.cualitativo),
              label: 'Escuela Cualitativo',
              color: '#2F4858',
              highlightScope: { highlight: 'item', fade: 'global' },
            },
            {
              type: 'line',
              data: FacAverageCuantitativo,
              label: 'Facultad Cuantitativo',
              color: 'blue',
              highlightScope: { highlight: 'item', fade: 'global' },
            },
            {
              type: 'line',
              data: FacAverageCualitativo,
              label: 'Facultad Cualitativo',
              color: 'green',
              highlightScope: { highlight: 'item', fade: 'global' },
            },
          ]}
          xAxis={[
            {
              data: dataset.map((item) => item.escuela),
              scaleType: 'band',
              id: 'x-axis-id',
              labelStyle: {
                fontSize: 14,
                transform: `translateY(${
                      // Hack that debería agregarse en la biblioteca más adelante.
                      5 * Math.abs(Math.sin((Math.PI * 45) / 180))
                    }px)`
              },
              tickLabelStyle: {
                angle: 20,
                textAnchor: 'start',
                fontSize: 12,
              },
            },
          ]}
          yAxis={[
            {
              min: 0,
              max: 5,
              id: 'y-axis-id',
            },
          ]}
          width={700}
          height={400}
          margin={{ bottom: 80 }}
        >
          <BarPlot />
          <LinePlot />
          <ChartsXAxis position="bottom" axisId="x-axis-id" />
          <ChartsYAxis axisId="y-axis-id" />
          <ChartsAxisHighlight x="band" y="line" />
          <ChartsTooltip/>
        </ChartContainer>
      </Box>
    </Grid>
  );
};

export default SchoolsChart;
