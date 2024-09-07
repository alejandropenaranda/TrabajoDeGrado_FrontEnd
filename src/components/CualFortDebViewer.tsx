import React from 'react';
import { Box, Typography, Grid, Chip } from '@mui/material';

// Define las propiedades del componente
interface CualFortDebProps {
    valoraciones: {
        fortalezas: { [key: string]: number };
        debilidades: { [key: string]: number };
    };
}

// Define los colores y etiquetas para cada calificación
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

// Componente para mostrar fortalezas y debilidades del docente
const CualFortDeb: React.FC<CualFortDebProps> = ({ valoraciones }) => {
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
                Fortalezas y oportunidades de mejora del docente a partir de los comentarios de las evaluaciones docente
            </Typography>

            <Grid container spacing={1} sx={{ marginBottom: 2,  mt:2  }}>
                <Grid item xs={12}>
                    <Grid container spacing={1} justifyContent="center">
                        <Typography variant="subtitle1" display="inline" fontWeight="bold">
                            Categorías:
                        </Typography>
                        {['Muy Pobre', 'Pobre', 'Neutro', 'Bueno', 'Muy Bueno'].map((label, index) => (
                            <Chip
                                key={index}
                                label={`${label} (${index + 1})`}
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
                    {Object.entries(valoraciones.fortalezas).map(([key, value]) => {
                        const { label, color } = getTagProps(value);
                        return (
                            <Grid container spacing={1} key={key} sx={{ marginBottom: 2 }}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" display="inline" fontWeight="bold">
                                        {key}:
                                    </Typography>
                                    <Chip
                                        label={label}
                                        sx={{
                                            backgroundColor: color,
                                            color: 'black',
                                            fontWeight: 'bold',
                                            marginLeft: 1,
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
                    {Object.entries(valoraciones.debilidades).map(([key, value]) => {
                        const { label, color } = getTagProps(value);
                        return (
                            <Grid container spacing={1} key={key} sx={{ marginBottom: 2 }}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" display="inline" fontWeight="bold">
                                        {key}:
                                    </Typography>
                                    <Chip
                                        label={label}
                                        sx={{
                                            backgroundColor: color,
                                            color: 'black',
                                            fontWeight: 'bold',
                                            marginLeft: 1,
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



