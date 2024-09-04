import React from 'react';
import { Avatar, Button, Card, CardContent, Typography, Box } from '@mui/material';
import { APP_URL } from '../auth/constants';

interface WelcomeUserCardProps {
  nombre: string;
}

const WelcomeUserCard: React.FC<WelcomeUserCardProps> = ({ nombre }) => {
  return (
    <Card
      sx={{
        maxWidth: 500,

        width: "100%",
        margin: '0 auto',
        textAlign: 'center',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px'
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

        <Typography variant="h6" sx={{ marginTop: '16px', marginBottom: '24px' ,fontWeight: 'bold', textAlign: 'center' }}>
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
        >
          Cambiar contraseña
        </Button>
      </CardContent>
    </Card>
  );
};

export default WelcomeUserCard;
