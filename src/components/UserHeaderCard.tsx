import React, { useState } from 'react';
import { Typography, Avatar, Grid, Menu, MenuItem, Snackbar, Alert } from '@mui/material';
import { User } from '../types/GeneralTypes';
import { useAuth } from '../auth/AuthProvider';
import { APP_URL } from '../auth/constants';
import ChangePasswordModal from './EditUserPassword';
import { selfModifyUserPassword } from '../services/UserManagementService';

interface UserHeaderCardProps {
  token: string;
}

const UserHeaderCard: React.FC<UserHeaderCardProps> = ({ token }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  const auth = useAuth();
  const user = JSON.parse(localStorage.getItem("user") || '{}') as User;

  const handleSingOut = () => {
    auth.signOut();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    handleClose();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Función para manejar el guardado de la nueva contraseña
  const handleSavePassword = async (cedula: string, newPassword: string) => {
    try {
      const response = await selfModifyUserPassword(token, { cedula: cedula, password: newPassword });

      if ('error' in response) {
        setFeedback({ type: 'error', message: response.error });
      } else {
        setFeedback({ type: 'success', message: 'Contraseña cambiada exitosamente' });
        handleCloseModal(); // Cierra el modal después de guardar
      }
    } catch (error) {
      setFeedback({ type: 'error', message: 'Error al cambiar la contraseña' });
    }
  };

  const getRole = () => {
    if (user.is_admin) return 'Administrador';
    if (user.is_director) return 'Director de Escuela';
    if (user.is_profesor) return 'Docente';
    return 'Usuario';
  };

  return (
    <>
      <Grid container direction="row" alignItems="center" justifyContent="flex-end" gap={2} sx={{ width: 'auto', cursor: 'pointer' }} onClick={handleClick}>
        <Grid item>
          <Typography variant="body1" fontWeight="normal">
            {user.nombre} - <span style={{ color: 'red', fontWeight: "bold" }}>{getRole()}</span>
          </Typography>
        </Grid>
        <Avatar
          src={`${APP_URL}/avatar.png`}
          alt="User Avatar"
          sx={{ width: 60, height: 60 }}
        />
      </Grid>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleOpenModal}>
          Cambiar Contraseña
        </MenuItem>
        <MenuItem onClick={handleSingOut}>
          Cerrar Sesión
        </MenuItem>
      </Menu>

      {feedback && (
        <Snackbar
          open={!!feedback}
          autoHideDuration={2000}
          onClose={() => setFeedback(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ marginTop: '70px' }}
        >
          <Alert
            severity={feedback.type}
            sx={{ width: 'auto' }}
          >
            {feedback.message}
          </Alert>
        </Snackbar>
      )}

      <ChangePasswordModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSavePassword}
      />
    </>
  );
};

export default UserHeaderCard;
