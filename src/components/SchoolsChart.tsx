import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { ResponsiveChartContainer, ChartsTooltip, ChartsXAxis, ChartsYAxis } from '@mui/x-charts';
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
    { label: 'Cuantitativo Escuela', color: 'red' },
    { label: 'Cualitativo Escuela', color: '#2F4858' },
    { label: 'Cuantitativo Facultad', color: 'blue' },
    { label: 'Cualitativo Facultad', color: 'green' },
  ];

  const splitLabel = (label: string, maxLength: number) => {
    const words = label.split(' ');
    let currentLine = '';
    const lines = [];

    for (const word of words) {
      if (currentLine.length + word.length <= maxLength) {
        currentLine += word + ' ';
      } else {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      }
    }
    if (currentLine) {
      lines.push(currentLine.trim());
    }
    return lines.join('\n');
  };

  return (
    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          borderRadius: '10px',
          pb: '14px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: 'white',
          maxWidth: '100%',
          width: '100%',
          height: 'auto',
          overflow: 'hidden',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '10px', mt: '20px' }}>
          Promedios de calificaciones por Escuela
        </Typography>
        <Box sx={{ pt: '10px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
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
        <Box sx={{ width: '100%', height: 390 }}> {/* Contenedor para responsividad */}
          <ResponsiveChartContainer
            series={[
              {
                type: 'bar',
                data: dataset.map(item => item.cuantitativo),
                label: 'Cuantitativo Escuela',
                color: 'red',
                highlightScope: { highlight: 'item', fade: 'global' },
              },
              {
                type: 'bar',
                data: dataset.map(item => item.cualitativo),
                label: 'Cualitativo Escuela',
                color: '#2F4858',
                highlightScope: { highlight: 'item', fade: 'global' },
              },
              {
                type: 'line',
                data: FacAverageCuantitativo,
                label: 'Cuantitativo Facultad',
                color: 'blue',
                highlightScope: { highlight: 'item', fade: 'global' },
              },
              {
                type: 'line',
                data: FacAverageCualitativo,
                label: 'Cualitativo Facultad',
                color: 'green',
                highlightScope: { highlight: 'item', fade: 'global' },
              },
            ]}
            xAxis={[
              {
                data: dataset.map((item) => splitLabel(item.escuela, 10)),
                scaleType: 'band',
                id: 'x-axis-id',
                tickLabelStyle: {
                  angle: 0,
                  textAnchor: 'middle',
                  fontSize: 10,
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
              // Solo definimos la altura
            margin={{ bottom: 80 }}
          >
            <BarPlot />
            <LinePlot />
            <ChartsXAxis position="bottom" axisId="x-axis-id" />
            <ChartsYAxis axisId="y-axis-id" />
            <ChartsAxisHighlight x="band" y="line" />
            <ChartsTooltip />
          </ResponsiveChartContainer>
        </Box>
      </Box>
    </Grid>
  );
};

export default SchoolsChart;
