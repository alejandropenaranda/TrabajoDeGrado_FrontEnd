import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Grid } from '@mui/material';
import { TeacherRankingResponse } from '../types/DirectorTypes';


interface TeacherRankingTableProps {
    data: TeacherRankingResponse;
    escuela: string;
}

const TeacherRankingTable: React.FC<TeacherRankingTableProps> = ({ data, escuela }) => {
    return (
        <>
        <Grid item xs={12}>
            <Box
                sx={{
                    backgroundColor: 'red',
                    color: 'white',
                    borderTopRightRadius: '10px',
                    borderTopLeftRadius: '10px',
                    padding: '16px',
                    textAlign: 'center'
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Ranking docentes escuela de ingeniería {escuela}
                </Typography>
            </Box>
        </Grid>
        
        <TableContainer component={Paper} sx={{borderBottomRightRadius: '10px', borderBottomLeftRadius: '10px'}}>
            <Table sx={{ minWidth: 300, borderRadius: '10px', overflow: 'hidden' }} aria-label="teacher ranking table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ color: 'black', width: '50%' }}><strong>Docente</strong></TableCell>
                        <TableCell align="center" sx={{ color: 'black' }}><strong>Calificación promedio</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.docente__id} sx={{ height: '24px' }}>
                            <TableCell align="center" sx={{ padding: '6px 16px' }}>{item.docente__nombre}</TableCell>
                            <TableCell align="center" sx={{ padding: '6px 16px' }}>{item.promedio_total.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
};

export default TeacherRankingTable;
