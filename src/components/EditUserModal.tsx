/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Switch, FormControlLabel, Button } from '@mui/material';
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

    useEffect(() => {
        setUpdatedUser(user);
        setOriginalUser(user);
    }, [user]);

    const handleInputChange = (field: keyof User, value: any) => {
        setUpdatedUser((prevUser: User) => ({
            ...prevUser,
            [field]: value,
        }));
    };
    const isSaveEnabled = () => {
        return JSON.stringify(updatedUser) !== JSON.stringify(originalUser);
    };

    const handleSaveClick = () => {
        onSave(updatedUser);
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
                </Box>

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
