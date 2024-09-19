// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect } from 'react';
// import {
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
//     TextField, Button, Grid, Box, Typography, InputAdornment, TableFooter, TablePagination, Alert,
//     Snackbar
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { userResponse } from '../types/AdminTypes';
// import { ColumnConfig, User } from '../types/GeneralTypes';
// import UsersTableFilter from './UsersTableFilter';
// import EditUserModal from './EditUserModal';
// import { modifyUser } from '../services/UserManagementService';

// interface UsersTableComponentProps {
//     name: string;
//     columns: ColumnConfig[];
//     data: userResponse;
//     showActions?: boolean;
//     token: string;
// }

// const UsersTableComponent: React.FC<UsersTableComponentProps> = ({ name, columns = [], data = [], token }) => {
//     const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
//     const [isDirectorChecked, setIsDirectorChecked] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [loading, setLoading] = useState(true);
//     const [selectedUser, setSelectedUser] = useState<User | null>(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [users, setUsers] = useState<User[]>(data);
//     const [feedback, setFeedback] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

//     useEffect(() => {
//         if (data && data.length > 0) {
//             setLoading(false);
//             const sortedUsers = [...data].sort((a, b) => a.id - b.id);
//             setUsers(sortedUsers);
//         } else if (data === null) {
//             setLoading(true);
//         }
//     }, [data]);

//     useEffect(() => {
//         if (feedback) {
//             const timer = setTimeout(() => {
//                 setFeedback(null);
//             }, 2000);
//             return () => clearTimeout(timer);
//         }
//     }, [feedback]);

//     const uniqueSchools = Array.from(new Set((data || []).map(item => item.escuela.nombre)));

//     const handleChangePage = (__event: unknown, newPage: number) => {
//         setPage(newPage);
//     };

//     const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(event.target.value.toLowerCase());
//     };

//     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const handleSchoolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const school = event.target.name;
//         const isChecked = event.target.checked;

//         setSelectedSchools(prevSelectedSchools =>
//             isChecked
//                 ? [...prevSelectedSchools, school]
//                 : prevSelectedSchools.filter(s => s !== school)
//         );
//     };

//     const handleDirectorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setIsDirectorChecked(event.target.checked);
//     };

//     const handleEditClick = (user: User) => {
//         setSelectedUser(user);
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//         setSelectedUser(null);
//     };

//     const handleSaveUser = async (updatedUser: User) => {
//         if (selectedUser) {
//             const { nombre, email, codigo, is_admin, is_director } = updatedUser;
//             const body: Partial<User> = {};

//             if (nombre !== selectedUser.nombre) body.nombre = nombre;
//             if (email !== selectedUser.email) body.email = email;
//             if (codigo !== selectedUser.codigo) body.codigo = codigo;
//             if (is_admin !== selectedUser.is_admin) body.is_admin = is_admin;
//             if (is_director !== selectedUser.is_director) body.is_director = is_director;

//             try {
//                 const result = await modifyUser(token, selectedUser.id, body);
//                 if (result) {
//                     setUsers(prevUsers => prevUsers.map(user =>
//                         user.id === selectedUser.id ? { ...user, ...body } : user
//                     ));
//                     setFeedback({ message: 'Usuario actualizado correctamente.', type: 'success' });
//                 }
//             } catch (error) {
//                 console.error('Error al actualizar el usuario:', error);
//                 setFeedback({ message: 'Error al actualizar el usuario.', type: 'error' });
//             } finally {
//                 setIsModalOpen(false);
//                 setSelectedUser(null);
//                 setTimeout(() => setFeedback(null), 2000);
//             }
//         }
//     };

//     const filteredResults = (users || []).filter(item =>
//         (selectedSchools.length === 0 || selectedSchools.includes(item.escuela.nombre)) &&
//         (!isDirectorChecked || item.is_director === true) &&
//         item.nombre.toLowerCase().includes(searchTerm)
//     );

//     const getNestedValue = (obj: any, path: string): any => {
//         return path.split('.').reduce((o, i) => (o ? o[i] : ''), obj);
//     };

//     const formatCellData = (data: any, path: string) => {
//         const value = getNestedValue(data, path);
//         if (path === 'is_director') {
//             return value ? 'Sí' : 'No';
//         }
//         if (typeof value === 'number') {
//             return value.toFixed(2);
//         }
//         if (typeof value === 'string') {
//             return value;
//         }
//         return '';
//     };

//     return (
//         <Grid container spacing={3}>
//             <Grid item xs={12} md={8}>
//                 <TableContainer component={Paper} sx={{ borderRadius: '10px', position: 'relative' }}>
//                     <Box sx={{
//                         backgroundColor: 'red', padding: 2, display: 'flex',
//                         justifyContent: 'space-between', alignItems: 'center', borderTopLeftRadius: 10,
//                         borderTopRightRadius: 10
//                     }}>
//                         <Typography variant="h6" sx={{ color: 'white' }}>
//                             {name}
//                         </Typography>
//                         <TextField
//                             placeholder="Buscar Docente"
//                             variant="outlined"
//                             value={searchTerm}
//                             onChange={handleSearchChange}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="start">
//                                         <SearchIcon sx={{ color: 'gray' }} />
//                                     </InputAdornment>
//                                 ),
//                             }}
//                             sx={{ backgroundColor: 'white', borderRadius: 1, width: "50%" }}
//                         />
//                     </Box>
//                     {loading ? (
//                         <Box sx={{ padding: 2, textAlign: 'center' }}>
//                             <Typography variant="h6">Obteniendo datos...</Typography>
//                         </Box>
//                     ) : (
//                         <>
//                             <Table>
//                                 <TableHead sx={{ backgroundColor: 'white' }}>
//                                     <TableRow>
//                                         {columns.map((col, index) => (
//                                             <TableCell
//                                                 key={index}
//                                                 sx={{
//                                                     color: 'black',
//                                                     textAlign: 'center',
//                                                     whiteSpace: 'normal',
//                                                     wordBreak: 'break-word',
//                                                     maxWidth: '100px',
//                                                     overflow: 'hidden',
//                                                     textOverflow: 'ellipsis'
//                                                 }}
//                                             >
//                                                 {col.headerName}
//                                             </TableCell>
//                                         ))}
//                                         <TableCell sx={{ maxWidth: '80px', textAlign: 'center' }}>Acciones</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody sx={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
//                                     {filteredResults.length > 0 ? (
//                                         filteredResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
//                                             <TableRow key={index}>
//                                                 {columns.map((col, colIndex) => (
//                                                     <TableCell
//                                                         key={colIndex}
//                                                         sx={{
//                                                             textAlign: 'center',
//                                                             maxWidth: '100px',
//                                                             overflow: 'hidden',
//                                                             textOverflow: 'ellipsis'
//                                                         }}
//                                                     >
//                                                         {formatCellData(row, col.fieldName)}
//                                                     </TableCell>
//                                                 ))}
//                                                 <TableCell sx={{ textAlign: 'center' }}>
//                                                     <Button
//                                                         variant="contained"
//                                                         sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' }, borderRadius: 10, ml: 1 }}
//                                                         onClick={() => handleEditClick(row)}
//                                                     >
//                                                         Editar
//                                                     </Button>
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))
//                                     ) : (
//                                         <TableRow>
//                                             <TableCell colSpan={columns.length + 1} sx={{ textAlign: 'center' }}>
//                                                 No hay datos disponibles
//                                             </TableCell>
//                                         </TableRow>
//                                     )}
//                                 </TableBody>
//                                 <TableFooter sx={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
//                                     <TableRow>
//                                         <TablePagination
//                                             rowsPerPageOptions={[5, 10]}
//                                             colSpan={columns.length + 1}
//                                             count={filteredResults.length}
//                                             rowsPerPage={rowsPerPage}
//                                             page={page}
//                                             onPageChange={handleChangePage}
//                                             onRowsPerPageChange={handleChangeRowsPerPage}
//                                             labelRowsPerPage="Filas por página"
//                                         />
//                                     </TableRow>
//                                 </TableFooter>
//                             </Table>
//                         </>
//                     )}
//                     {feedback && (
//                         <Snackbar
//                             open={!!feedback}
//                             autoHideDuration={2000}
//                             onClose={() => setFeedback(null)}
//                             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//                             sx={{ marginTop: '70px' }}
//                         >
//                             <Alert
//                                 severity={feedback?.type}
//                                 sx={{ width: 'auto' }}
//                             >
//                                 {feedback?.message}
//                             </Alert>
//                         </Snackbar>
//                     )}
//                 </TableContainer>
//             </Grid>
//             <Grid item xs={12} md={4} >
//                 <UsersTableFilter
//                     schools={uniqueSchools}
//                     selectedSchools={selectedSchools}
//                     isDirectorChecked={isDirectorChecked}
//                     onSchoolChange={handleSchoolChange}
//                     onDirectorChange={handleDirectorChange}
//                 />
//             </Grid>
//             {selectedUser && (
//                 <EditUserModal
//                     user={selectedUser}
//                     open={isModalOpen}
//                     onClose={handleCloseModal}
//                     onSave={handleSaveUser}
//                 />
//             )}
//         </Grid>
//     );
// };

// export default UsersTableComponent;



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
    const [isAdminChecked, setIsAdminChecked] = useState(false); // Nuevo estado para filtro "Es admin"
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedback, setFeedback] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
    const [users, setUsers] = useState<User[]>(Array.isArray(data) ? data : []);

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

    const filteredResults = (users || []).filter(item =>
        (selectedSchools.length === 0 || selectedSchools.includes(item.escuela.nombre)) &&
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
                                            rowsPerPageOptions={[5, 10, 25]}
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
                    isAdminChecked={isAdminChecked} // Pasar el nuevo filtro
                    onSchoolChange={handleSchoolChange}
                    onDirectorChange={handleDirectorChange}
                    onAdminChange={handleAdminChange} // Manejar el cambio del filtro "Es admin"
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


// import React, { useState, useEffect } from 'react';
// import {
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
//     TextField, Button, Grid, Box, Typography, InputAdornment, TableFooter, TablePagination, Alert,
//     Snackbar
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { userResponse } from '../types/AdminTypes';
// import { ColumnConfig, User } from '../types/GeneralTypes';
// import UsersTableFilter from './UsersTableFilter';
// import EditUserModal from './EditUserModal';
// import CreateUserModal from './CreateUserModal';  // Importamos el nuevo modal
// import { modifyUser } from '../services/UserManagementService'; // Agregar createUser

// interface UsersTableComponentProps {
//     name: string;
//     columns: ColumnConfig[];
//     data: userResponse;
//     showActions?: boolean;
//     token: string;
// }

// const UsersTableComponent: React.FC<UsersTableComponentProps> = ({ name, columns = [], data = [], token }) => {
//     const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
//     const [isDirectorChecked, setIsDirectorChecked] = useState(false);
//     const [isAdminChecked, setIsAdminChecked] = useState(false); // Estado para filtro "Es admin"
//     const [searchTerm, setSearchTerm] = useState('');
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [loading, setLoading] = useState(true); // Marcamos como true al principio
//     const [selectedUser, setSelectedUser] = useState<User | null>(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);  // Estado para el modal de creación
//     const [feedback, setFeedback] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
//     const [users, setUsers] = useState<User[]>(Array.isArray(data) ? data : []);

//     useEffect(() => {
//         if (Array.isArray(data) && data.length > 0) {
//             setLoading(false); // Una vez recibidos los datos, detener el loading
//             const sortedUsers = [...data].sort((a, b) => a.id - b.id);
//             setUsers(sortedUsers);
//         } else if (data === null) {
//             setLoading(true); // Volvemos a activar el loading si los datos son nulos
//         }
//     }, [data]);

//     useEffect(() => {
//         if (feedback) {
//             const timer = setTimeout(() => {
//                 setFeedback(null);
//             }, 2000);
//             return () => clearTimeout(timer);
//         }
//     }, [feedback]);

//     const uniqueSchools = Array.from(new Set((data || []).map(item => item.escuela.nombre)));

//     const handleChangePage = (__event: unknown, newPage: number) => {
//         setPage(newPage);
//     };

//     const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(event.target.value.toLowerCase());
//     };

//     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const handleSchoolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const school = event.target.name;
//         const isChecked = event.target.checked;

//         setSelectedSchools(prevSelectedSchools =>
//             isChecked
//                 ? [...prevSelectedSchools, school]
//                 : prevSelectedSchools.filter(s => s !== school)
//         );
//     };

//     const handleDirectorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setIsDirectorChecked(event.target.checked);
//     };

//     const handleAdminChange = (event: React.ChangeEvent<HTMLInputElement>) => { // Manejador para "Es admin"
//         setIsAdminChecked(event.target.checked);
//     };

//     const handleEditClick = (user: User) => {
//         setSelectedUser(user);
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//         setSelectedUser(null);
//     };

//     const handleSaveUser = async (updatedUser: User) => {
//         if (selectedUser) {
//             const { nombre, email, codigo, is_admin, is_director } = updatedUser;
//             const body: Partial<User> = {};

//             if (nombre !== selectedUser.nombre) body.nombre = nombre;
//             if (email !== selectedUser.email) body.email = email;
//             if (codigo !== selectedUser.codigo) body.codigo = codigo;
//             if (is_admin !== selectedUser.is_admin) body.is_admin = is_admin;
//             if (is_director !== selectedUser.is_director) body.is_director = is_director;

//             try {
//                 const result = await modifyUser(token, selectedUser.id, body);
//                 if (result) {
//                     setUsers(prevUsers => prevUsers.map(user =>
//                         user.id === selectedUser.id ? { ...user, ...body } : user
//                     ));
//                     setFeedback({ message: 'Usuario actualizado correctamente.', type: 'success' });
//                 }
//             } catch (error) {
//                 console.error('Error al actualizar el usuario:', error);
//                 setFeedback({ message: 'Error al actualizar el usuario.', type: 'error' });
//             } finally {
//                 setIsModalOpen(false);
//                 setSelectedUser(null);
//             }
//         }
//     };

//     const handleCreateUser = async (newUser: User) => {
//         try {
//             // const createdUser = await createUser(token, newUser); // Llamada al backend
//             // if (createdUser) {
//             //     setUsers([...users, createdUser]); // Lógica para agregar el nuevo usuario a la tabla
//             //     setIsCreateModalOpen(false);  // Cerrar el modal después de crear el usuario
//             //     setFeedback({ message: 'Usuario creado correctamente.', type: 'success' });
//             // }
//             console.log(newUser)
//         } catch (error) {
//             console.error('Error al crear el usuario:', error);
//             setFeedback({ message: 'Error al crear el usuario.', type: 'error' });
//         }
//     };

//     const filteredResults = (users || []).filter(item =>
//         (selectedSchools.length === 0 || selectedSchools.includes(item.escuela.nombre)) &&
//         (!isDirectorChecked || item.is_director === true) &&
//         (!isAdminChecked || item.is_admin === true) && // Filtro "Es admin"
//         item.nombre.toLowerCase().includes(searchTerm)
//     );

//     const getNestedValue = (obj: any, path: string): any => {
//         return path.split('.').reduce((o, i) => (o ? o[i] : ''), obj);
//     };

//     const formatCellData = (data: any, path: string) => {
//         const value = getNestedValue(data, path);
//         if (path === 'is_director' || path === 'is_admin') {
//             return value ? 'Sí' : 'No';
//         }
//         if (typeof value === 'number') {
//             return value.toFixed(2);
//         }
//         if (typeof value === 'string') {
//             return value;
//         }
//         return '';
//     };

//     return (
//         <Grid container spacing={3}>
//             <Grid item xs={12} md={8}>
//                 <TableContainer component={Paper} sx={{ borderRadius: '10px', position: 'relative' }}>
//                     <Box sx={{
//                         backgroundColor: 'red', padding: 2, display: 'flex',
//                         justifyContent: 'space-between', alignItems: 'center', borderTopLeftRadius: 10,
//                         borderTopRightRadius: 10
//                     }}>
//                         <Typography variant="h6" sx={{ color: 'white' }}>
//                             {name}
//                         </Typography>
//                         <Button
//                             variant="contained"
//                             sx={{ backgroundColor: 'white', color: 'black' }}
//                             onClick={() => setIsCreateModalOpen(true)} // Abrir el modal
//                         >
//                             Crear Nuevo Usuario
//                         </Button>
//                         <TextField
//                             placeholder="Buscar Docente"
//                             variant="outlined"
//                             value={searchTerm}
//                             onChange={handleSearchChange}
//                             size="small"
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <SearchIcon />
//                                     </InputAdornment>
//                                 ),
//                             }}
//                             sx={{ backgroundColor: 'white', borderRadius: '5px', width: '25%' }}
//                         />
//                     </Box>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 {columns.map(column => (
//                                     <TableCell key={column.fieldName}>{column.headerName}</TableCell>
//                                 ))}
//                                 <TableCell>Acciones</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {loading ? (
//                                 <TableRow>
//                                     <TableCell colSpan={columns.length + 1}>
//                                         <Alert severity="info">Cargando usuarios...</Alert>
//                                     </TableCell>
//                                 </TableRow>
//                             ) : filteredResults.length > 0 ? (
//                                 filteredResults
//                                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                     .map(user => (
//                                         <TableRow key={user.id}>
//                                             {columns.map(column => (
//                                                 <TableCell key={column.fieldName}>
//                                                     {formatCellData(user, column.fieldName)}
//                                                 </TableCell>
//                                             ))}
//                                             <TableCell>
//                                                 <Button onClick={() => handleEditClick(user)}>Editar</Button>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))
//                             ) : (
//                                 <TableRow>
//                                     <TableCell colSpan={columns.length + 1}>
//                                         <Alert severity="info">No se encontraron usuarios.</Alert>
//                                     </TableCell>
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                         <TableFooter>
//                             <TableRow>
//                                 <TablePagination
//                                     rowsPerPageOptions={[5, 10, 15]}
//                                     count={filteredResults.length}
//                                     rowsPerPage={rowsPerPage}
//                                     page={page}
//                                     onPageChange={handleChangePage}
//                                     onRowsPerPageChange={handleChangeRowsPerPage}
//                                 />
//                             </TableRow>
//                         </TableFooter>
//                     </Table>
//                 </TableContainer>
//             </Grid>
//             <Grid item xs={12} md={4}>
//                 <UsersTableFilter
//                     schools={uniqueSchools}
//                     selectedSchools={selectedSchools}
//                     onSchoolChange={handleSchoolChange}
//                     isDirectorChecked={isDirectorChecked}
//                     onDirectorChange={handleDirectorChange}
//                     isAdminChecked={isAdminChecked} // Prop para el filtro "Es admin"
//                     onAdminChange={handleAdminChange} // Manejador para el filtro "Es admin"
//                 />
//             </Grid>
//             <EditUserModal
//                 open={isModalOpen}
//                 onClose={handleCloseModal}
//                 user={selectedUser!}
//                 onSave={handleSaveUser}
//             />
//             <CreateUserModal // Nuevo modal para crear usuario
//                 open={isCreateModalOpen}
//                 onClose={() => setIsCreateModalOpen(false)}
//                 onSave={handleCreateUser} // Pasa el método de guardar al modal
//             />
//             <Snackbar
//                 open={!!feedback}
//                 autoHideDuration={2000}
//                 onClose={() => setFeedback(null)}
//                 anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             >
//                 <Alert onClose={() => setFeedback(null)} severity={feedback?.type} sx={{ width: '100%' }}>
//                     {feedback?.message}
//                 </Alert>
//             </Snackbar>
//         </Grid>
//     );
// };

// export default UsersTableComponent;
