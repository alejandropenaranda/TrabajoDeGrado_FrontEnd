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

            <Grid container spacing={3} item xs={12} md={12} justifyContent="center">
                <Grid container item spacing={3} xs={12} md={12} justifyContent="center" sx={{ display: 'flex', alignItems: 'stretch' }}>
                    {[
                        { title: "Promedio general escuela", value: data.promedio_escuela },
                        { title: "Promedio cuantitativo escuela", value: data.promedio_escuela_cuantitativo },
                        { title: "Promedio cualitativo escuela", value: data.promedio_escuela_cualitativo },
                        { title: "Promedio general facultad", value: data.promedio_facultad },
                        { title: "Promedio cuantitativo facultad", value: data.promedio_facultad_cuantitativo },
                        { title: "Promedio cualitativo facultad", value: data.promedio_facultad_cualitativo },
                    ].map((item, index) => (
                        <Grid item xs={12} sm={4} key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', flex: 1 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>
                                        {verificarValorNumerico(item.value)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default DirectorGradesCards;
