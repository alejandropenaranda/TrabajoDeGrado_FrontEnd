// import { Card, CardContent, Grid, Typography, Box } from "@mui/material";
// import { FacSchoolGradesResponse } from "../types/DirectorTypes";

// interface DirectorGradesCardsProps {
//     data: FacSchoolGradesResponse;
//     escuela: string;
// }

// const DirectorGradesCards: React.FC<DirectorGradesCardsProps> = ({ data, escuela }) => {

//     const verificarValorNumerico = (valor: any) => {
//         return typeof valor === 'number' && !isNaN(valor) ? valor.toFixed(2) : "N/A";
//     };

//     return (
//         <Grid container spacing={3} justifyContent="center">

//             <Grid item xs={12}>
//                 <Box
//                     sx={{
//                         backgroundColor: 'red',
//                         color: 'white',
//                         borderRadius: '10px',
//                         padding: '16px',
//                         textAlign: 'center'
//                     }}
//                 >
//                     <Typography variant="h5" sx={{ fontWeight: 500 }}>
//                         Escuela de ingeniería {escuela}
//                     </Typography>
//                 </Box>
//             </Grid>

//             <Grid item xs={12} md={6} direction={'column'}>
//                 <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
//                     <CardContent>
//                         <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
//                             Promedio general de la escuela
//                         </Typography>
//                         <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>
//                             {verificarValorNumerico(data.promedio_escuela)}
//                         </Typography>
//                     </CardContent>
//                 </Card>
//                 <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
//                     <CardContent>
//                         <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
//                             Promedio cuantitativo de la escuela
//                         </Typography>
//                         <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>
//                             {verificarValorNumerico(data.promedio_escuela_cuantitativo)}
//                         </Typography>
//                     </CardContent>
//                 </Card>
//                 <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
//                     <CardContent>
//                         <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
//                             Promedio cualitativo de la escuela
//                         </Typography>
//                         <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>
//                             {verificarValorNumerico(data.promedio_escuela_cualitativo)}
//                         </Typography>
//                     </CardContent>
//                 </Card>

//             </Grid>

//             <Grid item xs={12} md={6} direction={'column'}>
//                 <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
//                     <CardContent>
//                         <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
//                             Promedio general de la facultad
//                         </Typography>
//                         <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>
//                             {verificarValorNumerico(data.promedio_facultad)}
//                         </Typography>
//                     </CardContent>
//                 </Card>

//                 <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
//                     <CardContent>
//                         <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
//                             Promedio cuantitativo de la facultad
//                         </Typography>
//                         <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>
//                             {verificarValorNumerico(data.promedio_facultad_cuantitativo)}
//                         </Typography>
//                     </CardContent>
//                 </Card>

//                 <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
//                     <CardContent>
//                         <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
//                             Promedio cualitativo de la facultad
//                         </Typography>
//                         <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>
//                             {verificarValorNumerico(data.promedio_facultad_cualitativo)}
//                         </Typography>
//                     </CardContent>
//                 </Card>
//             </Grid>
//         </Grid>
//     );
// }

// export default DirectorGradesCards;

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
                <Grid item xs={12} sm={4}>
                    <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                                Promedio general escuela
                            </Typography>
                            <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>
                                {verificarValorNumerico(data.promedio_escuela)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                                Promedio cuantitativo escuela
                            </Typography>
                            <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>
                                {verificarValorNumerico(data.promedio_escuela_cuantitativo)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                                Promedio cualitativo escuela
                            </Typography>
                            <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>
                                {verificarValorNumerico(data.promedio_escuela_cualitativo)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Tarjetas de la facultad */}
            <Grid container spacing={3} item xs={12} md={12} justifyContent="center">
                <Grid item xs={12} sm={4}>
                    <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                                Promedio general facultad
                            </Typography>
                            <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>
                                {verificarValorNumerico(data.promedio_facultad)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                                Promedio cuantitativo facultad
                            </Typography>
                            <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>
                                {verificarValorNumerico(data.promedio_facultad_cuantitativo)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                                Promedio cualitativo facultad
                            </Typography>
                            <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>
                                {verificarValorNumerico(data.promedio_facultad_cualitativo)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default DirectorGradesCards;
