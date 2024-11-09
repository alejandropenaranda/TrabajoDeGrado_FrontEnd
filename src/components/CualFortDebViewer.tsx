import React from 'react';
import { Box, Typography, Grid, Chip } from '@mui/material';

interface CualFortDebProps {
    valoraciones: {
        error?: string;
        fortalezas?: { [key: string]: number };
        debilidades?: { [key: string]: number };
    };
}

const getTagProps = (valoracion: number) => {
    switch (valoracion) {
        case 1:
            return { label: 'Muy Pobre', color: 'red' };
        case 2:
            return { label: 'Pobre', color: 'orange' };
        case 3:
            return { label: 'Neutro', color: 'yellow' };
        case 4:
            return { label: 'Bueno', color: 'lightgreen' };
        case 5:
            return { label: 'Muy Bueno', color: 'green' };
        default:
            return { label: 'No Definido', color: 'gray' };
    }
};

const CualFortDeb: React.FC<CualFortDebProps> = ({ valoraciones }) => {
    if (valoraciones.error === 'Error al procesar los comentarios después de 3 intentos: La respuesta parece ser un eco del ejemplo.') {
        return (
            <Box
                sx={{
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    padding: 3,
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }}
            >
                <Typography variant="h6" align="center" fontWeight="bold">
                    No fue posible identificar fortalezas y oportunidades de mejora cualitativas para el docente indicado
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                padding: 3,
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <Typography variant="h6" align="center" fontWeight="bold" gutterBottom>
                Fortalezas y oportunidades de mejora del docente a partir de los comentarios de las evaluaciones docente
            </Typography>

            <Grid container spacing={1} sx={{ marginBottom: 2, mt: 2 }}>
                <Grid item xs={12}>
                    <Grid container spacing={1} justifyContent="center" alignItems="center">
                        <Typography variant="subtitle1" display="inline" fontWeight="bold" sx={{ marginRight: 1 }}>
                            Categorías:
                        </Typography>
                        {['Muy Pobre', 'Pobre', 'Neutro', 'Bueno', 'Muy Bueno'].map((label, index) => (
                            <Chip
                                key={index}
                                label={`${label}`}
                                sx={{
                                    backgroundColor: ['red', 'orange', 'yellow', 'lightgreen', 'green'][index],
                                    color: 'black',
                                    fontWeight: 'bold',
                                    margin: 0.5,
                                }}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Fortalezas
                    </Typography>
                    {Object.entries(valoraciones.fortalezas || {}).map(([key, value]) => {
                        const { label, color } = getTagProps(value);
                        return (
                            <Grid container spacing={1} key={key} sx={{ marginBottom: 2 }}>
                                <Grid item xs={12} justifyContent="center" alignItems="center">
                                    <Typography variant="subtitle1" display="inline" fontWeight="bold" sx={{ marginRight: 1 }}>
                                        {key}:
                                    </Typography>
                                    <Chip
                                        label={label}
                                        sx={{
                                            backgroundColor: color,
                                            color: 'black',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        );
                    })}
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Oportunidades de mejora
                    </Typography>
                    {Object.entries(valoraciones.debilidades || {}).map(([key, value]) => {
                        const { label, color } = getTagProps(value);
                        return (
                            <Grid container spacing={1} key={key} sx={{ marginBottom: 2 }}>
                                <Grid item xs={12} justifyContent="center" alignItems="center">
                                    <Typography variant="subtitle1" display="inline" fontWeight="bold" sx={{ marginRight: 1 }}>
                                        {key}:
                                    </Typography>
                                    <Chip
                                        label={label}
                                        sx={{
                                            backgroundColor: color,
                                            color: 'black',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
        </Box>
    );
};

export default CualFortDeb;
