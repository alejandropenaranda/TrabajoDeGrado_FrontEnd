import React from 'react';
import { Box, Typography, Grid, Chip } from '@mui/material';

interface CuantFortDebProps {
    valoraciones: {
        prom_pregunta_10: string;
        prom_pregunta_12: string;
        prom_pregunta_13: string;
        prom_pregunta_15: string;
        prom_pregunta_17: string;
        prom_pregunta_20: string;
    };
}

const questionLabels = {
    prom_pregunta_10: 'Planificación',
    prom_pregunta_12: 'Metodología',
    prom_pregunta_13: 'Manera de Explicar',
    prom_pregunta_15: 'Disponibilidad para asesorías',
    prom_pregunta_17: 'Tiempo de entrega de calificaciones',
    prom_pregunta_20: 'Trato a los estudiantes',
};

const getTagProps = (valoracion: string) => {
    switch (valoracion) {
        case 'deb_MP':
            return { label: 'Muy Pobre', color: 'red', value: '1' };
        case 'deb_P':
            return { label: 'Pobre', color: 'orange', value: '2' };
        case 'neu':
            return { label: 'Neutro', color: 'yellow', value: '3' };
        case 'fort_B':
            return { label: 'Bueno', color: 'lightgreen', value: '4' };
        case 'fort_MB':
            return { label: 'Muy Bueno', color: 'green', value: '5' };
        default:
            return { label: 'No Definido', color: 'gray', value: '-' };
    }
};

const CuantFortDeb: React.FC<CuantFortDebProps> = ({ valoraciones }) => {
    return (
        <Box
            sx={{
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                padding: 3,
                backgroundColor: 'white'
            }}
        >
            <Typography variant="h6" align="center" fontWeight="bold" gutterBottom>
                Fortalezas y oportunidades e mejora del docente a partir de las calificaciones cuantitativas de las evaluaciones docente
            </Typography>
            <Grid container spacing={2} sx={{ marginBottom: 2, mt:2 }}>
                <Grid item xs={12}>
                    <Grid container spacing={1} justifyContent="center">
                        <Typography variant="subtitle1" display="inline" fontWeight="bold">
                                    Categorias:
                        </Typography>{' '}
                        {['Muy Pobre', 'Pobre', 'Neutro', 'Bueno', 'Muy Bueno'].map((label, index) => {
                            const colors = ['red', 'orange', 'yellow', 'lightgreen', 'green'];
                            return (
                                <Chip
                                    key={index}
                                    label={`${label} (${index + 1})`}
                                    sx={{
                                        backgroundColor: colors[index],
                                        color: 'black',
                                        fontWeight: 'bold',
                                        margin: 0.5,
                                    }}
                                />
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Cualidades del Docente:
            </Typography>
            <Grid container spacing={2}>
                {Object.keys(questionLabels).map((key) => {
                    const { label, color } = getTagProps(valoraciones[key as keyof typeof valoraciones]);
                    return (
                        <Grid item xs={12} md={6} key={key}>
                            <Typography variant="subtitle1" display="inline" fontWeight="bold">
                                {questionLabels[key as keyof typeof valoraciones]}:
                            </Typography>{' '}
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
                    );
                })}
            </Grid>
        </Box>
    );
};

export default CuantFortDeb;