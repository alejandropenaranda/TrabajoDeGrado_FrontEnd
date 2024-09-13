import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TextField, Button, Grid, Box, Typography,
    InputAdornment, TableFooter, TablePagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { userResponse } from '../types/AdminTypes';
import { ColumnConfig } from '../types/GeneralTypes';
import UsersTableFilter from './UsersTableFilter'; // Asegúrate de importar el componente de filtro

interface UsersTableComponentProps {
    name: string;
    columns: ColumnConfig[];
    data: userResponse;
    showActions?: boolean;
}

const UsersTableComponent: React.FC<UsersTableComponentProps> = ({ name, columns = [], data = [] }) => {
    const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
    const [isDirectorChecked, setIsDirectorChecked] = useState(false); // Estado para "Es director"
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

    const uniqueSchools = Array.from(new Set((data || []).map(item => item.escuela.nombre)));

    const handleChangePage = (__event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Maneja el cambio en los checkboxes de las escuelas
    const handleSchoolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const school = event.target.name;
        const isChecked = event.target.checked;

        setSelectedSchools(prevSelectedSchools =>
            isChecked
                ? [...prevSelectedSchools, school]
                : prevSelectedSchools.filter(s => s !== school)
        );
    };

    // Maneja el cambio en el checkbox "Es director"
    const handleDirectorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsDirectorChecked(event.target.checked);
    };

    const handleViewMore = (id: number, nombre: string) => {
        navigate(`/teacher-viewer/${id}`, { state: { nombre } });
    };

    // Filtrar los datos por escuela, "Es director" y búsqueda
    const filteredResults = (data || []).filter(item =>
        (selectedSchools.length === 0 || selectedSchools.includes(item.escuela.nombre)) &&
        (!isDirectorChecked || item.is_director === true) &&
        item.nombre.toLowerCase().includes(searchTerm)
    );

    const getNestedValue = (obj: any, path: string): any => {
        return path.split('.').reduce((o, i) => (o ? o[i] : ''), obj);
    };

    const formatCellData = (data: any, path: string) => {
        const value = getNestedValue(data, path);
        if (path === 'is_director') {
            return value ? 'Sí' : 'No';
        }
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
                <TableContainer component={Paper} sx={{ borderRadius: '10px' }}>
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
                            sx={{ backgroundColor: 'white', borderRadius: 1, width: "50%" }}
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
                                        <TableCell sx={{ maxWidth: '80px', textAlign: 'center' }}>Acciones</TableCell>
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
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <Button
                                                        variant="contained"
                                                        sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: '#cc0000' }, borderRadius: 10 }}
                                                        onClick={() => handleViewMore(row.id, row.nombre)}
                                                    >
                                                        Ver más
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length + 1} sx={{ textAlign: 'center' }}>
                                                No hay datos disponibles
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter sx={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10]}
                                            colSpan={columns.length + 1}
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
                {/* Componente de filtro */}
                <UsersTableFilter
                    schools={uniqueSchools}
                    selectedSchools={selectedSchools}
                    isDirectorChecked={isDirectorChecked}
                    onSchoolChange={handleSchoolChange}
                    onDirectorChange={handleDirectorChange}
                />
            </Grid>
        </Grid>
    );
};

export default UsersTableComponent;


