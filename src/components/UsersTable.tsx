import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TextField, Button, Grid, Box, Typography, InputAdornment, TableFooter, TablePagination, Alert,
    Snackbar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { userResponse } from '../types/AdminTypes';
import { ColumnConfig, createUser, User } from '../types/GeneralTypes';
import UsersTableFilter from './UsersTableFilter';
import EditUserModal from './EditUserModal';
import { createUserService, modifyUser } from '../services/UserManagementService';
import CreateUserModal from './CreateUserModal';
import { getSchools } from '../services/SchoolService';

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
    const [isAdminChecked, setIsAdminChecked] = useState(false); // Nuevo estado para filtro "Es admin"
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedback, setFeedback] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
    const [users, setUsers] = useState<User[]>(Array.isArray(data) ? data : []);
    const [isModalCreateUserOpen, setIsModalCreateUserOpen] = useState<boolean>(false);
    const [schoolsData, setSchoolsData] = useState<any>(null)

    useEffect(() => {
        const fetchSchoosData = async () => {
            const data = await getSchools(token);
            setSchoolsData(data);
        };

        fetchSchoosData();
    }, [token]);

    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
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


    const uniqueSchools = Array.from(new Set(
        (data || []).map(item => item.escuela ? item.escuela.nombre : null)
        .filter(school => school !== null) // Filtra valores nulos
    ));
    
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

    const handleAdminChange = (event: React.ChangeEvent<HTMLInputElement>) => { // Nuevo manejador para "Es admin"
        setIsAdminChecked(event.target.checked);
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
                setTimeout(() => setFeedback(null), 2000);
            }
        }
    };

    const handleCreateClick = () => {
        setIsModalCreateUserOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsModalCreateUserOpen(false);
    };

    const handleCreateUser = async (newUser: createUser) => {
        console.log('Nuevo usuario creado:', newUser);
        try {
            const result = await createUserService(token, newUser);
            console.log(result);
    
            if ('user' in result && result.user && 'id' in result.user) {
                setUsers(prevUsers => [...prevUsers, result.user]);
                setFeedback({ message: 'Usuario creado correctamente.', type: 'success' });
            } else {
                setFeedback({ message: 'Error al crear el usuario.', type: 'error' });
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            setFeedback({ message: 'Error al crear el usuario.', type: 'error' });
        } finally {
            setIsModalOpen(false);
            setSelectedUser(null);
            setTimeout(() => setFeedback(null), 2000);
        }
        handleCloseCreateModal();
    };

    const filteredResults = (users || []).filter(item =>
        (selectedSchools.length === 0 || 
         (item.escuela && selectedSchools.includes(item.escuela.nombre))) && // Verifica que escuela no sea null
        (!isDirectorChecked || item.is_director === true) &&
        (!isAdminChecked || item.is_admin === true) && // Nuevo filtro "Es admin"
        item.nombre.toLowerCase().includes(searchTerm)
    );

    const getNestedValue = (obj: any, path: string): any => {
        return path.split('.').reduce((o, i) => (o ? o[i] : ''), obj);
    };

    const formatCellData = (data: any, path: string) => {
        const value = getNestedValue(data, path);
        if (path === 'is_director' || path === 'is_admin') {
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
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'red',
                        color: 'white',
                        '&:hover': { backgroundColor: 'darkred' },
                    }}
                    onClick={ handleCreateClick}
                >
                    Crear Usuario
                </Button>
                {schoolsData && (
                                <CreateUserModal 
                                open={isModalCreateUserOpen} 
                                schools = {schoolsData}
                                onClose={handleCloseCreateModal} 
                                onSave={handleCreateUser} 
                            />
                            )}
            </Grid>
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
                                    {filteredResults.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={columns.length + 1} sx={{ textAlign: 'center' }}>
                                                <Typography variant="body2">No se encontraron resultados</Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10]}
                                            component="td"
                                            count={filteredResults.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </>
                    )}
                </TableContainer>
            </Grid>
            <Grid item xs={12} md={4}>
                <UsersTableFilter
                    schools={uniqueSchools} 
                    selectedSchools={selectedSchools}
                    isDirectorChecked={isDirectorChecked}
                    isAdminChecked={isAdminChecked}
                    onSchoolChange={handleSchoolChange}
                    onDirectorChange={handleDirectorChange}
                    onAdminChange={handleAdminChange}
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
            {feedback && (
                <Snackbar
                    open={true}
                    autoHideDuration={2000}
                    onClose={() => setFeedback(null)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert severity={feedback.type}>
                        {feedback.message}
                    </Alert>
                </Snackbar>
            )}
        </Grid>
    );
};

export default UsersTableComponent;
 