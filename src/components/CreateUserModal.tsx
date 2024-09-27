import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Switch, FormControlLabel, Button, InputAdornment, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createUser, getSchoolsResponse } from '../types/GeneralTypes';

interface CreateUserModalProps {
    open: boolean;
    schools: getSchoolsResponse;
    onClose: () => void;
    onSave: (newUser: createUser) => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ open, onClose, onSave, schools }) => {
    const [newUser, setNewUser] = useState<createUser>({
        nombre: '',
        email: '',
        codigo: '',
        password:'',
        is_admin: false,
        is_director: false,
        is_profesor: false,
        escuela_id: undefined,
    });
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const handleInputChange = (field: string, value: any) => {
        setNewUser((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));

        // Automatically mark is_profesor when is_director is toggled on
        if (field === 'is_director' && value) {
            setNewUser((prevUser) => ({
                ...prevUser,
                is_profesor: true,
            }));
        }
    };

    const handleSaveClick = () => {
        if (password && password !== confirmPassword) {
            setPasswordError('Las contraseñas no coinciden');
            return;
        }
        setPasswordError(null);
        newUser.password = password
        const userWithPassword = newUser
    
        onSave(userWithPassword);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)', width: 400,
                backgroundColor: 'white', padding: 4, borderRadius: 2,
                boxShadow: 24
            }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    Crear Usuario
                </Typography>
                <TextField
                    label="Nombre"
                    fullWidth
                    value={newUser.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Correo Electrónico"
                    fullWidth
                    value={newUser.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Código"
                    fullWidth
                    value={newUser.codigo}
                    onChange={(e) => handleInputChange('codigo', e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <Box sx={{ display: 'flex', marginBottom: 2 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={newUser.is_admin}
                                onChange={(e) => handleInputChange('is_admin', e.target.checked)}
                            />
                        }
                        label="Admin"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={newUser.is_director}
                                onChange={(e) => handleInputChange('is_director', e.target.checked)}
                            />
                        }
                        label="Director"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={newUser.is_profesor}
                                onChange={(e) => handleInputChange('is_profesor', e.target.checked)}
                            />
                        }
                        label="Profesor"
                    />
                </Box>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel id="escuela-label">Escuela</InputLabel>
                    <Select
                        labelId='escuela-label'
                        value={newUser.escuela_id || ''}
                        onChange={(e) => handleInputChange('escuela_id', e.target.value === 'Ninguna' ? null : e.target.value)}
                        label="Escuela"
                        sx={{ '& .MuiInputLabel-root': { top: 0, left: 14 },
                              '& .MuiSelect-root': { display: 'flex', alignItems: 'center' } }}
                    >
                        <MenuItem value="Ninguna">
                            <em>Ninguna</em>
                        </MenuItem>
                        {schools.map((school) => (
                            <MenuItem key={school.id} value={school.id}>
                                {school.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ marginBottom: 2 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Confirmar Contraseña"
                    type={showConfirmPassword ? 'text' : 'password'}
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={{ marginBottom: 2 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {passwordError && <Typography color="error" sx={{ marginBottom: 2 }}>{passwordError}</Typography>}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
                    <Button
                        onClick={onClose}
                        sx={{ marginRight: 2, backgroundColor: 'lightgray', color: 'black',
                            '&:hover': {
                                backgroundColor: 'darkgray',
                            }}}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSaveClick}
                        disabled={!newUser.nombre || !newUser.email || !password || !confirmPassword}
                        sx={{
                            backgroundColor: !newUser.nombre || !newUser.email || !password || !confirmPassword ? 'lightgray' : 'green',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: !newUser.nombre || !newUser.email || !password || !confirmPassword ? 'lightgray' : 'darkgreen',
                            }
                        }}
                    >
                        Crear
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CreateUserModal;
