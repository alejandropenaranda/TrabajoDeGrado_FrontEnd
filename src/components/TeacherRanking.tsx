import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Tabs, Tab } from '@mui/material';
import { TeacherRankingResponse, TeacherRankingItem } from '../types/DirectorTypes';

interface TeacherRankingTableProps {
    data: TeacherRankingResponse;
    escuela: string;
}

const TeacherRankingTable: React.FC<TeacherRankingTableProps> = ({ data, escuela }) => {
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        console.log("Datos recibidos:", data);
        console.log("Top 10 mejor rankeados:", data.top_best);
        console.log("Top 10 menor rankeados:", data.top_worst);
    }, [data]);

    const handleChange = (__event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const renderTable = (items: TeacherRankingItem[], title: string) => (
        <>
            <Box sx={{ backgroundColor: 'red', color: 'white', borderTopRightRadius: '10px', borderTopLeftRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    {title} de la escuela de ingeniería {escuela}
                </Typography>
            </Box>
            {items.length > 0 ? (
                <TableContainer component={Paper} sx={{ borderBottomRightRadius: '10px', borderBottomLeftRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                    <Table sx={{ minWidth: 300, borderRadius: '10px' }} aria-label="teacher ranking table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ color: 'black', width: '50%' }}><strong>Docente</strong></TableCell>
                                <TableCell align="center" sx={{ color: 'black' }}><strong>Calificación promedio</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item.docente__id} sx={{ height: '40px' }}>
                                    <TableCell align="center" sx={{ padding: '6px 16px' }}>{item.docente__nombre}</TableCell>
                                    <TableCell align="center" sx={{ padding: '6px 16px' }}>{item.promedio_total.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="body1" sx={{ padding: '16px', textAlign: 'center' }}>
                    Sin datos disponibles
                </Typography>
            )}
        </>
    );

    return (
        <Box>
            <Tabs
                value={tabValue}
                onChange={handleChange}
                centered
                sx={{
                    '& .MuiTabs-flexContainer': {
                        width: '100%',
                    },
                    '& .MuiTab-root': {
                        width: '50%',
                        color: 'black',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        margin: '4px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        transition: 'background-color 0.3s',
                        '&:focus, &:active, &:visited': {
                            color: 'black',
                        },
                    },
                    '& .Mui-selected': {
                        backgroundColor: 'red',
                        color: 'white',
                        '&:focus, &:active, &:visited': {
                            color: 'white', 
                        },
                    },
                    '& .MuiTabs-indicator': {
                        display: 'none',
                    },
                }}
            >
                <Tab label="Top 10 Mejor Rankeados" />
                <Tab label="Top 10 Menor Rankeados" />
            </Tabs>

            {tabValue === 0 && renderTable(data.top_best || [], "Top 10 docentes con mejor desempeño")}
            {tabValue === 1 && renderTable(data.top_worst || [], "Top 10 docentes con menor desempeño")}
        </Box>
    );
};

export default TeacherRankingTable;


