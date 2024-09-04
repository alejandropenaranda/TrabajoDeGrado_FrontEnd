import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DirectorRedirectionButtons: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (route: string) => {
    navigate(`/${route}`); // Cambia la ruta según tu proyecto
  };

  return (
    <Grid container spacing={3} display={'flex'} direction={'column'} sx={{ justifyContent: 'center' }}>

      <Grid item xs={12} md={6}>
        <Card
          sx={{
            maxWidth: 500,
            margin: '0 auto',
            textAlign: 'center',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
              Vista general de los docentes de la escuela
            </Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '20px',
                padding: '10px 30px',
                fontSize: '14px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'darkred',
                },
              }}
              onClick={() => handleClick('school-view')}
            >
              Entrar
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card
          sx={{
            maxWidth: 500,
            margin: '0 auto',
            textAlign: 'center',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
              Vista del docente
            </Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '20px',
                padding: '10px 30px',
                fontSize: '14px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'darkred',
                },
              }}
              onClick={() => handleClick('teacher-view')}
            >
              Entrar
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DirectorRedirectionButtons;
