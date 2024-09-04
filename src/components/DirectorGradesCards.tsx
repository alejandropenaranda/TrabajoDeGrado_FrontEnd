import { Card, CardContent, Grid, Typography, Box } from "@mui/material";
import { FacSchoolGradesResponse } from "../types/DirectorTypes";

interface DirectorGradesCardsProps {
    data: FacSchoolGradesResponse;
    escuela: string;
}

const DirectorGradesCards: React.FC<DirectorGradesCardsProps> = ({ data, escuela }) => {

    const verificarValorNumerico = (valor: any) => {
        return typeof valor === 'number' && !isNaN(valor) ? valor.toFixed(2) : "N/A";
    };

    return (
        <Grid container spacing={3} justifyContent="center">

            <Grid item xs={12}>
                <Box
                    sx={{
                        backgroundColor: 'red',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '16px',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 500 }}>
                        Escuela de ingeniería {escuela}
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                            Promedio general de la escuela
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>
                            {verificarValorNumerico(data.promedio_escuela)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                            Promedio general de la facultad
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>
                            {verificarValorNumerico(data.promedio_facultad)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default DirectorGradesCards;

