import React, { useState, useEffect } from 'react';
import { Grid, Tabs, Tab, Box, Typography } from '@mui/material';
import WordCloud from '../components/WordCloud';
import { getWordCloud } from '../services/wordCloud';
import GradesBarChart from '../components/BarChart'
import { getCuantBarChart, getCualBarChart } from '../services/BarCharts'
import { getBestWorstComment } from '../services/BestWorstComment';
import CommentViewer from './CommentViewer';
import { getAverageGrades } from '../services/AverageGrades';
import GradesCards from './GradesCards';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      item
      xs={12}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      sx={{
        backgroundColor: '#FFFFFF',
        height: '100vh', // Altura específica
        overflow: 'hidden', // Evitar desbordamientos
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Sombra alrededor del panel
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: '16px', // Espacio interior
        boxSizing: 'border-box',
        mt: 0,
      }}
    >
      {value === index && (
        <Grid sx={{ height: '100%', gap: '10px'}}>
          {children}
        </Grid>
      )}
    </Grid>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabsProps {
  token: string;
  id: number;
}

const MyTabs: React.FC<TabsProps> = ({ token, id }) => {
  const [value, setValue] = useState(0);
  const [wordCloudData, setWordCloudData] = useState<any>(null);
  const [cuantBarChartData, setcuantBarChartData] = useState<any>(null);
  const [cualBarChartData, setcualBarChartData] = useState<any>(null);
  const [bestWorstCommentData, setBestWorstCommentData] = useState<any>(null);
  const [averageGradesData, setAverageGradesData] = useState<any>(null)
  // Aqui poner tantos use estate como componentes que hagan peticiones tenga en mis tabs

  useEffect(() => {
    // Aqui Se definen todas las funciones asincronas de los componentes de las tabs y luego se llaman
    const fetchWordCloudData = async () => {
      const data = await getWordCloud(token, id);
      setWordCloudData(data);
    };

    const fetchCuantBarChartData = async () => {
        const data = await getCuantBarChart(token, id);
        setcuantBarChartData(data);
      };

    const fetchCualBarChartData = async () => {
        const data = await getCualBarChart(token, id);
        setcualBarChartData(data);
    };

    const fetchBestWorstCommentData = async () => {
      const data = await getBestWorstComment(token, id);
      setBestWorstCommentData(data);
    };

    const fetchAverageGradesData = async () => {
      const data = await getAverageGrades(token, id);
      setAverageGradesData(data);
    };

    fetchWordCloudData();
    fetchCuantBarChartData();
    fetchCualBarChartData();
    fetchBestWorstCommentData();
    fetchAverageGradesData();
  }, [token, id]);

  const handleChange = (__event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{
          backgroundColor: 'red',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          '& .MuiTabs-indicator': {
            backgroundColor: 'white',
          },
          '& .MuiTab-root': {
            color: 'white',
          },
          '& .Mui-selected': {
            color: 'white',
          },
        }}
      >
        <Tab label="Gran nombre de la tab" {...a11yProps(0)}/>
        <Tab label="Tab 2" {...a11yProps(1)} />
        <Tab label="Tab 3" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {wordCloudData && <WordCloud data={wordCloudData} />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {cuantBarChartData && <GradesBarChart data={cuantBarChartData} nombre='Calificación Cuantitativa' />}
        {cualBarChartData && <GradesBarChart data={cualBarChartData} nombre='Calificación Cualitativa' />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid>
          {bestWorstCommentData && <CommentViewer data={bestWorstCommentData}/>}
        </Grid>
        <Grid sx={{mt: '20px'}}>
          {averageGradesData && <GradesCards data={averageGradesData}/>}
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default MyTabs;