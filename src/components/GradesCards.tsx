import { Card, CardContent, Grid, Typography } from "@mui/material";
import { AverageGradesResponse } from "../types/TeacherTypes";

interface TeacherGradesCardsProps {
    data: AverageGradesResponse;
}

const TeacherGradesCards: React.FC<TeacherGradesCardsProps> = ({ data }) => {   

    if ('error' in data) {
        return (
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12}>
                    <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', width: '100%' }}>
                        <CardContent>
                            <Typography variant="h5" sx={{ fontWeight: '500', textAlign: 'center',color: '#5c5c5c' }}>
                                No fue posible obtener la información
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                            Promedio General
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>{data.promedio.toFixed(2)}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                            Promedio Cualitativo
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>{data.promedio_cual.toFixed(2)}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                            Promedio Cuantitativo
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>{data.promedio_cuant.toFixed(2)}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default TeacherGradesCards;
