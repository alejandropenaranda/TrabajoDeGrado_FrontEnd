import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Switch, FormControlLabel, Button, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { User } from '../types/GeneralTypes';

interface EditUserModalProps {
    user: User;
    open: boolean;
    onClose: () => void;
    onSave: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, open, onClose, onSave }) => {
    const [updatedUser, setUpdatedUser] = useState<User>(user);
    const [originalUser, setOriginalUser] = useState<User>(user);
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    useEffect(() => {
        setUpdatedUser(user);
        setOriginalUser(user);
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError(null);
    }, [user, open]);

    const handleInputChange = (field: keyof User, value: any) => {
        setUpdatedUser((prevUser: User) => ({
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
        const userWithPassword = { ...updatedUser, password: newPassword };
        onSave(userWithPassword);
    };

    const isSaveEnabled = () => {
        return JSON.stringify(updatedUser) !== JSON.stringify(originalUser) || newPassword || confirmPassword;
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)', width: 500,
                backgroundColor: 'white', padding: 4, borderRadius: 2,
                boxShadow: 24
            }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    Editar Usuario
                </Typography>
                <TextField
                    label="Nombre"
                    fullWidth
                    value={updatedUser.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Correo Electrónico"
                    fullWidth
                    value={updatedUser.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Código"
                    fullWidth
                    value={updatedUser.codigo}
                    onChange={(e) => handleInputChange('codigo', e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={updatedUser.is_admin}
                                onChange={(e) => handleInputChange('is_admin', e.target.checked)}
                            />
                        }
                        label="Es Admin"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={updatedUser.is_director}
                                onChange={(e) => handleInputChange('is_director', e.target.checked)}
                            />
                        }
                        label="Es Director"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={updatedUser.is_active}
                                onChange={(e) => handleInputChange('is_active', e.target.checked)}
                            />
                        }
                        label="Activo"
                    />
                </Box>
                <TextField
                    label="Nueva Contraseña"
                    type={showNewPassword ? 'text' : 'password'}
                    fullWidth
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    sx={{ marginBottom: 2 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
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
                        disabled={!isSaveEnabled()}
                        sx={{
                            backgroundColor: isSaveEnabled() ? 'red' : 'lightgray',
                            color: isSaveEnabled() ? 'white' : 'black',
                            '&:hover': {
                                backgroundColor: isSaveEnabled() ? 'darkred' : 'lightgray',
                            }
                        }}
                    >
                        Guardar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditUserModal;
