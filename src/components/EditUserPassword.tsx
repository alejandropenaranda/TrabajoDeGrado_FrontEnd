import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface ChangePasswordModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (cedula: string, newPassword: string) => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ open, onClose, onSave }) => {
    const [cedula, setCedula] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open) {
            setCedula('');
            setNewPassword('');
            setConfirmPassword('');
            setError(null);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
        }
    }, [open]);

    const handleSave = () => {
        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            setTimeout(() => {
                setError('');
            }, 3000);
        } else {
            setError(null);
            onSave(cedula, newPassword);
        }
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
                    Cambiar Contraseña
                </Typography>

                <TextField
                    label="Cédula"
                    fullWidth
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />

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
                        )
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
                        )
                    }}
                />

                {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <Button
                        onClick={onClose}
                        sx={{
                            marginRight: 2, backgroundColor: 'lightgray', color: 'black',
                            '&:hover': { backgroundColor: 'darkgray' }
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{
                            backgroundColor: 'red', color: 'white',
                            '&:hover': { backgroundColor: 'darkred' }
                        }}
                        disabled={!cedula || !newPassword || !confirmPassword}
                    >
                        Guardar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ChangePasswordModal;

