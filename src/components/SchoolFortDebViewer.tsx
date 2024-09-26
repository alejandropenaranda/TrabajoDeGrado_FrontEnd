import React from 'react';
import { Box, Typography, Grid, List, ListItem, ListItemText } from '@mui/material';

interface SchoolFortDebProps {
    valoraciones?: { 
        fortalezas?: string[];
        oportunidades_mejora?: string[];
        error?: string;
    }
}

const SchoolFortDeb: React.FC<SchoolFortDebProps> = ({ valoraciones }) => {
    // Si valoraciones no está definido, inicializamos fortalezas y oportunidades_mejora como arrays vacíos
    const fortalezas = valoraciones?.fortalezas || [];
    const oportunidades_mejora = valoraciones?.oportunidades_mejora || [];
    const error = valoraciones?.error;  // Obtenemos el mensaje de error

    const noData = fortalezas.length === 0 && oportunidades_mejora.length === 0 && !error;

    return (
        <Box
            sx={{
                flex: 1,
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                padding: 3,
                backgroundColor: 'white',
            }}
        >
            <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                Fortalezas y oportunidades de mejora generales de los docentes de la escuela
            </Typography>

            {error ? (  // Si hay un error, lo mostramos aquí
                <Typography variant="body1" align="center" color="error">
                    No se logró identificar fortalezas y oportunidades de mejora para la escuela.
                </Typography>
            ) : noData ? (
                <Typography variant="body1" align="center">
                    No se encontraron datos.
                </Typography>
            ) : (
                <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Fortalezas
                        </Typography>
                        {fortalezas.length > 0 ? (
                            <List sx={{ listStyleType: 'disc', paddingLeft: 2 }}>
                                {fortalezas.map((fortaleza, index) => (
                                    <ListItem key={index} sx={{ display: 'list-item', paddingLeft: 2 }}>
                                        <ListItemText primary={fortaleza} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No se encontraron fortalezas.
                            </Typography>
                        )}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Oportunidades de mejora
                        </Typography>
                        {oportunidades_mejora.length > 0 ? (
                            <List sx={{ listStyleType: 'disc', paddingLeft: 2 }}>
                                {oportunidades_mejora.map((oportunidad, index) => (
                                    <ListItem key={index} sx={{ display: 'list-item', paddingLeft: 2 }}>
                                        <ListItemText primary={oportunidad} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No se encontraron oportunidades de mejora.
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default SchoolFortDeb;
