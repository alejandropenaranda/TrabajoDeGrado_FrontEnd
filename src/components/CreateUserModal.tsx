import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Switch, FormControlLabel, Button, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface CreateUserModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (newUser: any) => void; // Definido como `any`, puedes ajustar el tipo si tienes una interfaz específica.
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ open, onClose, onSave }) => {
    const [newUser, setNewUser] = useState({
        nombre: '',
        email: '',
        codigo: '',
        is_admin: false,
        is_director: false,
    });
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    useEffect(() => {
        if (!open) {
            setNewUser({ nombre: '', email: '', codigo: '', is_admin: false, is_director: false });
            setNewPassword('');
            setConfirmPassword('');
            setPasswordError(null);
        }
    }, [open]);

    const handleInputChange = (field: string, value: any) => {
        setNewUser((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    const handleSaveClick = () => {
        if (newPassword && newPassword !== confirmPassword) {
            setPasswordError('Las contraseñas no coinciden');
            return;
        }
        setPasswordError(null);
        const userWithPassword = { ...newUser, password: newPassword };
        onSave(userWithPassword); // Llamada al método onSave
    };

    const isSaveEnabled = () => {
        return newUser.nombre && newUser.email && newPassword && newPassword === confirmPassword;
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ /* estilos del modal */ }}>
                <Typography variant="h6" gutterBottom>
                    Crear Nuevo Usuario
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
                <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={newUser.is_admin}
                                onChange={(e) => handleInputChange('is_admin', e.target.checked)}
                            />
                        }
                        label="Es Admin"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={newUser.is_director}
                                onChange={(e) => handleInputChange('is_director', e.target.checked)}
                            />
                        }
                        label="Es Director"
                    />
                </Box>
                <TextField
                    label="Nueva Contraseña"
                    type={showNewPassword ? 'text' : 'password'}
                    fullWidth
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Confirmar Contraseña"
                    type={showConfirmPassword ? 'text' : 'password'}
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{ marginBottom: 2 }}
                />
                {passwordError && <Typography color="error">{passwordError}</Typography>}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
                    <Button onClick={onClose} sx={{ marginRight: 2 }}>Cancelar</Button>
                    <Button
                        variant="contained"
                        onClick={handleSaveClick}
                        disabled={!isSaveEnabled()}
                    >
                        Guardar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CreateUserModal;
