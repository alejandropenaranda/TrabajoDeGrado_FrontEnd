import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TextField, Button, Grid, Box, Typography,
    InputAdornment, TableFooter, TablePagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AvergaGradesRegistersResponse } from '../types/TeacherTypes';
import { useNavigate } from 'react-router-dom';
import FiltersComponent from './FiltersComponent';

export interface ColumnConfig {
    headerName: string;
    fieldName: string;
}

interface TableComponentProps {
    name: string;
    columns: ColumnConfig[];
    data: AvergaGradesRegistersResponse;
    showActions?: boolean;
    showSchoolFilter: boolean;
    showSubjectFilter: boolean;
}

const TableComponent: React.FC<TableComponentProps> = ({ name, columns = [], data = [], showActions = false, showSchoolFilter , showSubjectFilter }) => {
    const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
    const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
    const [selectedSubjects, setSelectedSubject] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (data && data.length > 0) {
            setLoading(false);
        } else if (data === null) {
            setLoading(true);
        }
    }, [data]);

    // Extrae los períodos y escuelas únicos de los datos
    const uniquePeriods = Array.from(new Set((data || []).map(item => item.periodo)));
    const uniqueSchools = Array.from(new Set((data || []).map(item => item.escuela)));
    const uniqueSubjects = Array.from(new Set((data || []).map(item => item.materia.codigo)));

    // Maneja el cambio de página
    const handleChangePage = (__event: unknown, newPage: number) => {
        setPage(newPage);
    };

    // Maneja los cambios en el campo de búsqueda
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    // Maneja el cambio de la cantidad de filas por página
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Maneja los cambios en los filtros de periodo
    const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const period = event.target.name;
        const isChecked = event.target.checked;

        setSelectedPeriods(prevSelectedPeriods =>
            isChecked
                ? [...prevSelectedPeriods, period]
                : prevSelectedPeriods.filter(p => p !== period)
        );
    };

    // Maneja los cambios en los filtros de escuela
    const handleSchoolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const school = event.target.name;
        const isChecked = event.target.checked;

        setSelectedSchools(prevSelectedSchools =>
            isChecked
                ? [...prevSelectedSchools, school]
                : prevSelectedSchools.filter(s => s !== school)
        );
    };

    const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const subject = event.target.name;
        const isChecked = event.target.checked;

        setSelectedSubject(prevSelectedSubjects =>
            isChecked
                ? [...prevSelectedSubjects, subject]
                : prevSelectedSubjects.filter(s => s !== subject)
        );
    };

    // Función para manejar la redirección
    const handleViewMore = (id: number, nombre: string) => {
        navigate(`/teacher-viewer/${id}`, { state: { nombre } });
    };

    // Filtra los datos según los periodos, escuelas seleccionados y el término de búsqueda
    const filteredResults = (data || []).filter(item =>
        (selectedPeriods.length === 0 || selectedPeriods.includes(item.periodo)) &&
        (selectedSchools.length === 0 || selectedSchools.includes(item.escuela)) &&
        (selectedSubjects.length === 0 || selectedSubjects.includes(item.materia.codigo)) &&
        item.docente_nombre.toLowerCase().includes(searchTerm)
    );

    const getNestedValue = (obj: any, path: string): any => {
        return path.split('.').reduce((o, i) => (o ? o[i] : ''), obj);
    };
    
    const formatCellData = (data: any, path: string) => {
        const value = getNestedValue(data, path);
        if (typeof value === 'number') {
            return value.toFixed(2);
        }
        if (typeof value === 'string') {
            return value;
        }
        return '';
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                <TableContainer component={Paper}>
                    <Box sx={{
                        backgroundColor: 'red', padding: 2, display: 'flex',
                        justifyContent: 'space-between', alignItems: 'center', borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                    }}>
                        <Typography variant="h6" sx={{ color: 'white' }}>
                            {name}
                        </Typography>
                        <TextField
                            placeholder="Buscar Docente"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: 'gray' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ backgroundColor: 'white', borderRadius: 1 }}
                        />
                    </Box>
                    {loading ? (
                        <Box sx={{ padding: 2, textAlign: 'center' }}>
                            <Typography variant="h6">Obteniendo datos...</Typography>
                        </Box>
                    ) : (
                        <>
                            <Table>
                                <TableHead sx={{ backgroundColor: 'white' }}>
                                    <TableRow>
                                        {columns.map((col, index) => (
                                            <TableCell
                                                key={index}
                                                sx={{
                                                    color: 'black',
                                                    textAlign: 'center',
                                                    whiteSpace: 'normal',
                                                    wordBreak: 'break-word',
                                                    maxWidth: '100px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}
                                            >
                                                {col.headerName}
                                            </TableCell>
                                        ))}
                                        {showActions && (
                                            <TableCell sx={{ maxWidth: '80px', textAlign: 'center' }}>Acciones</TableCell>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                    {filteredResults.length > 0 ? (
                                        filteredResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                            <TableRow key={index}>
                                                {columns.map((col, colIndex) => (
                                                    <TableCell
                                                        key={colIndex}
                                                        sx={{
                                                            textAlign: 'center',
                                                            maxWidth: '100px',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        }}
                                                    >
                                                        {formatCellData(row, col.fieldName)}
                                                    </TableCell>
                                                ))}
                                                {showActions && (
                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        <Button 
                                                            variant="contained" 
                                                            sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: '#cc0000' }, borderRadius:10 }}
                                                            onClick={() => handleViewMore(row.docente_id, row.docente_nombre)}
                                                        >
                                                            Ver más
                                                        </Button>
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length + (showActions ? 1 : 0)} sx={{ textAlign: 'center' }}>
                                                No hay datos disponibles
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter sx={{borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10]}
                                            colSpan={columns.length + (showActions ? 1 : 0)}
                                            count={filteredResults.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            labelRowsPerPage="Filas por página"
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </>
                    )}
                </TableContainer>
            </Grid>
            <Grid item xs={12} md={4}>
                <FiltersComponent
                    periods={uniquePeriods}
                    schools={uniqueSchools}
                    subjects={uniqueSubjects}
                    selectedPeriods={selectedPeriods}
                    selectedSchools={selectedSchools}
                    selectedSubjects={selectedSubjects}
                    onPeriodChange={handlePeriodChange}
                    onSchoolChange={handleSchoolChange}
                    onSubjectChange={handleSubjectChange}
                    showSchoolFilter={showSchoolFilter}
                    showSubjectFilter={showSubjectFilter}
                />
            </Grid>
        </Grid>
    );
};

export default TableComponent;
