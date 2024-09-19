import React, { useState } from 'react';
import { Avatar, Button, Card, CardContent, Typography, Box, Snackbar, Alert } from '@mui/material';
import { APP_URL } from '../auth/constants';
import ChangePasswordModal from './EditUserPassword';
import { selfModifyUserPassword } from '../services/UserManagementService'; // Ajusta la ruta si es necesario

interface WelcomeUserCardProps {
  nombre: string;
  token: string; // Asegúrate de pasar el token al componente
}

const WelcomeUserCard: React.FC<WelcomeUserCardProps> = ({ nombre, token }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Función para abrir el modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
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

  return (
    <>
      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          margin: '0 auto',
          textAlign: 'center',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          borderRadius: '10px',
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
            Bienvenido
          </Typography>

          {/* Contenedor del Avatar para centrarlo */}
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginBottom: '16px' }}>
            <Avatar
              src={`${APP_URL}/avatar.png`}
              alt="User Avatar"
              sx={{ width: 250, height: 250 }}
            />
          </Box>

          <Typography variant="h6" sx={{ marginTop: '16px', marginBottom: '24px', fontWeight: 'bold', textAlign: 'center' }}>
            {nombre}
          </Typography>

          {/* Botón de cambiar contraseña */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '14px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'darkred',
              },
            }}
            onClick={handleOpenModal}
          >
            Cambiar contraseña
          </Button>
        </CardContent>
        <ChangePasswordModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSavePassword}
        />
      </Card>
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
    </>
  );
};

export default WelcomeUserCard;
