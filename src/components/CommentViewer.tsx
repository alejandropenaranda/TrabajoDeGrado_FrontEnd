import { Card, CardContent, Grid, Typography } from "@mui/material";
import { BestWorstCommentResponse } from "../types/TeacherTypes";


interface CommentViewerProps {
    data: BestWorstCommentResponse;
}

const CommentViewer: React.FC<CommentViewerProps> = ({ data }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                            Comentario con mayor valoración
                        </Typography>
                        <Typography variant="body1"><strong>Materia:</strong> {data.mejor.materia.nombre}</Typography>
                        <Typography variant="body1"><strong>Período:</strong> {data.mejor.periodo}</Typography>
                        <Typography variant="body1"><strong>Promedio:</strong> {data.mejor.promedio.toFixed(2)}</Typography>
                        <Typography variant="body2" sx={{ marginTop: '8px' }}>"{data.mejor.comentario}"</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                            Comentario con menor valoración
                        </Typography>
                        <Typography variant="body1"><strong>Materia:</strong> {data.peor.materia.nombre}</Typography>
                        <Typography variant="body1"><strong>Período:</strong> {data.peor.periodo}</Typography>
                        <Typography variant="body1"><strong>Promedio:</strong> {data.peor.promedio.toFixed(2)}</Typography>
                        <Typography variant="body2" sx={{ marginTop: '8px' }}>"{data.peor.comentario}"</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default CommentViewer;