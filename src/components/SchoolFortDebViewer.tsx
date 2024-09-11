import React from 'react';
import { Box, Typography, Grid, List, ListItem, ListItemText } from '@mui/material';

interface SchoolFortDebProps {
    valoraciones: {
        fortalezas: string[];
        oportunidades_mejora: string[];
    }
}

const SchoolFortDeb: React.FC<SchoolFortDebProps> = ({ valoraciones }) => {
    return (
        <Box
            sx={{
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                padding: 3,
                backgroundColor: 'white',
            }}
        >
            <Typography variant="h6" align="center" fontWeight="bold" gutterBottom>
                Fortalezas y oportunidades de mejora generales de los docentes de la escuela
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Fortalezas
                    </Typography>
                    <List sx={{ listStyleType: 'disc', paddingLeft: 2 }}>
                        {valoraciones.fortalezas.map((fortaleza, index) => (
                            <ListItem key={index} sx={{ display: 'list-item', paddingLeft: 2 }}>
                                <ListItemText primary={fortaleza} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Oportunidades de mejora
                    </Typography>
                    <List sx={{ listStyleType: 'disc', paddingLeft: 2 }}>
                        {valoraciones.oportunidades_mejora.map((oportunidad, index) => (
                            <ListItem key={index} sx={{ display: 'list-item', paddingLeft: 2 }}>
                                <ListItemText primary={oportunidad} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SchoolFortDeb;
