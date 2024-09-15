/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TextField, Button, Grid, Box, Typography, InputAdornment, TableFooter, TablePagination, Alert,
    Snackbar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { userResponse } from '../types/AdminTypes';
import { ColumnConfig, User } from '../types/GeneralTypes';
import UsersTableFilter from './UsersTableFilter';
import EditUserModal from './EditUserModal';
import { modifyUser } from '../services/UserManagementService';

interface UsersTableComponentProps {
    name: string;
    columns: ColumnConfig[];
    data: userResponse;
    showActions?: boolean;
    token: string;
}

const UsersTableComponent: React.FC<UsersTableComponentProps> = ({ name, columns = [], data = [], token }) => {
    const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
    const [isDirectorChecked, setIsDirectorChecked] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState<User[]>(data);
    const [feedback, setFeedback] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        if (data && data.length > 0) {
            setLoading(false);
            const sortedUsers = [...data].sort((a, b) => a.id - b.id);
            setUsers(sortedUsers);
        } else if (data === null) {
            setLoading(true);
        }
    }, [data]);

    useEffect(() => {
        if (feedback) {
            const timer = setTimeout(() => {
                setFeedback(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [feedback]);

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

    const handleSchoolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const school = event.target.name;
        const isChecked = event.target.checked;

        setSelectedSchools(prevSelectedSchools =>
            isChecked
                ? [...prevSelectedSchools, school]
                : prevSelectedSchools.filter(s => s !== school)
        );
    };

    const handleDirectorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsDirectorChecked(event.target.checked);
    };

    const handleEditClick = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleSaveUser = async (updatedUser: User) => {
        if (selectedUser) {
            const { nombre, email, codigo, is_admin, is_director } = updatedUser;
            const body: Partial<User> = {};

            if (nombre !== selectedUser.nombre) body.nombre = nombre;
            if (email !== selectedUser.email) body.email = email;
            if (codigo !== selectedUser.codigo) body.codigo = codigo;
            if (is_admin !== selectedUser.is_admin) body.is_admin = is_admin;
            if (is_director !== selectedUser.is_director) body.is_director = is_director;

            try {
                const result = await modifyUser(token, selectedUser.id, body);
                if (result) {
                    setUsers(prevUsers => prevUsers.map(user =>
                        user.id === selectedUser.id ? { ...user, ...body } : user
                    ));
                    setFeedback({ message: 'Usuario actualizado correctamente.', type: 'success' });
                }
            } catch (error) {
                console.error('Error al actualizar el usuario:', error);
                setFeedback({ message: 'Error al actualizar el usuario.', type: 'error' });
            } finally {
                setIsModalOpen(false);
                setSelectedUser(null);
                setTimeout(() => setFeedback(null), 2000);  // Oculta el mensaje de feedback después de 2 segundos
            }
        }
    };

    const filteredResults = (users || []).filter(item =>
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
                <TableContainer component={Paper} sx={{ borderRadius: '10px', position: 'relative' }}>
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
                                                        sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' }, borderRadius: 10, ml: 1 }}
                                                        onClick={() => handleEditClick(row)}
                                                    >
                                                        Editar
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
                    {feedback && (
                        <Snackbar
                            open={!!feedback}
                            autoHideDuration={2000}
                            onClose={() => setFeedback(null)}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            sx={{ marginTop: '70px' }}
                        >
                            <Alert
                            variant='filled'
                                severity={feedback?.type}
                                sx={{ width: 'auto' }}
                            >
                                {feedback?.message}
                            </Alert>
                        </Snackbar>
                    )}
                </TableContainer>
            </Grid>
            <Grid item xs={12} md={4} >
                <UsersTableFilter
                    schools={uniqueSchools}
                    selectedSchools={selectedSchools}
                    isDirectorChecked={isDirectorChecked}
                    onSchoolChange={handleSchoolChange}
                    onDirectorChange={handleDirectorChange}
                />
            </Grid>
            {selectedUser && (
                <EditUserModal
                    user={selectedUser}
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSaveUser}
                />
            )}
        </Grid>
    );
};

export default UsersTableComponent;
