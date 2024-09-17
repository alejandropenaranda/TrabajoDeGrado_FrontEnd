// import React, { useState } from "react";
// import { Box, Card, CardContent, Typography, Button, CircularProgress, Alert, styled } from "@mui/material";
// import { uploadQuantitativeGrades, uploadQualitativeGrades } from "../services/UploadGrades"; // Asegúrate de cambiar el path al correcto

// // Estilos personalizados para el input de archivo
// const FileInput = styled('input')({
//     display: 'none', // Oculta el input de archivo
// });

// // Estilos personalizados para el botón
// const StyledButton = styled(Button)({
//     backgroundColor: '#d32f2f', // Rojo
//     color: 'white',
//     '&:hover': {
//         backgroundColor: '#b71c1c', // Rojo oscuro
//     },
// });

// const FileUploadComponent: React.FC<{ token: string }> = ({ token }) => {
//     const [qualitativeFile, setQualitativeFile] = useState<File | null>(null);
//     const [quantitativeFile, setQuantitativeFile] = useState<File | null>(null);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [alertMessage, setAlertMessage] = useState<string | null>(null);
//     const [alertType, setAlertType] = useState<"success" | "error" | undefined>(undefined);

//     const handleQualitativeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files) {
//             setQualitativeFile(event.target.files[0]);
//         }
//     };

//     const handleQuantitativeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files) {
//             setQuantitativeFile(event.target.files[0]);
//         }
//     };

//     const handleUploadQualitative = async () => {
//         if (!qualitativeFile) {
//             setAlertMessage("Por favor, selecciona un archivo para calificaciones cualitativas.");
//             setAlertType("error");
//             return;
//         }
//         setLoading(true);
//         const response = await uploadQualitativeGrades(token, qualitativeFile);
//         setLoading(false);
//         setQualitativeFile(null); // Limpia el archivo después de enviar

//         if (response && 'message' in response) { // Verifica que response no sea null
//             setAlertMessage(response.message);
//             setAlertType("success");
//         } else {
//             setAlertMessage("Error inesperado al subir las calificaciones cualitativas.");
//             setAlertType("error");
//         }
//     };

//     const handleUploadQuantitative = async () => {
//         if (!quantitativeFile) {
//             setAlertMessage("Por favor, selecciona un archivo para calificaciones cuantitativas.");
//             setAlertType("error");
//             return;
//         }
//         setLoading(true);
//         const response = await uploadQuantitativeGrades(token, quantitativeFile);
//         setLoading(false);
//         setQuantitativeFile(null); // Limpia el archivo después de enviar

//         if (response && 'message' in response) { // Verifica que response no sea null
//             setAlertMessage(response.message);
//             setAlertType("success");
//         } else {
//             setAlertMessage("Error inesperado al subir las calificaciones cuantitativas.");
//             setAlertType("error");
//         }
//     };

//     // Ocultar la alerta después de 3 segundos
//     React.useEffect(() => {
//         if (alertMessage) {
//             const timer = setTimeout(() => {
//                 setAlertMessage(null);
//                 setAlertType(undefined);
//             }, 3000);
//             return () => clearTimeout(timer);
//         }
//     }, [alertMessage]);

//     return (
//         <Box display="flex" flexDirection="column" gap={2} padding={2}>
//             {loading && <CircularProgress sx={{ alignSelf: 'center' }} />}
//             {alertMessage && alertType && (
//                 <Alert severity={alertType} sx={{ marginBottom: 2 }}>
//                     {alertMessage}
//                 </Alert>
//             )}

//             {/* Tarjeta para calificaciones cualitativas */}
//             <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
//                 <CardContent>
//                     <Typography variant="h6" gutterBottom>
//                         Subir Calificaciones Cualitativas
//                     </Typography>
//                     <label htmlFor="qualitative-file-upload">
//                         <FileInput
//                             id="qualitative-file-upload"
//                             type="file"
//                             accept=".xlsx"
//                             onChange={handleQualitativeFileChange}
//                         />
//                         <Button
//                             variant="contained"
//                             component="span"
//                             color="primary"
//                             sx={{ marginBottom: 2 }}
//                         >
//                             Seleccionar archivo
//                         </Button>
//                     </label>
//                     <StyledButton
//                         variant="contained"
//                         onClick={handleUploadQualitative}
//                         disabled={loading || !qualitativeFile}
//                     >
//                         Enviar Cualitativas
//                     </StyledButton>
//                 </CardContent>
//             </Card>

//             {/* Tarjeta para calificaciones cuantitativas */}
//             <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
//                 <CardContent>
//                     <Typography variant="h6" gutterBottom>
//                         Subir Calificaciones Cuantitativas
//                     </Typography>
//                     <label htmlFor="quantitative-file-upload">
//                         <FileInput
//                             id="quantitative-file-upload"
//                             type="file"
//                             accept=".xlsx"
//                             onChange={handleQuantitativeFileChange}
//                         />
//                         <Button
//                             variant="contained"
//                             component="span"
//                             color="primary"
//                             sx={{ marginBottom: 2 }}
//                         >
//                             Seleccionar archivo
//                         </Button>
//                     </label>
//                     <StyledButton
//                         variant="contained"
//                         onClick={handleUploadQuantitative}
//                         disabled={loading || !quantitativeFile}
//                     >
//                         Enviar Cuantitativas
//                     </StyledButton>
//                 </CardContent>
//             </Card>
//         </Box>
//     );
// };

// export default FileUploadComponent;

import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Button, CircularProgress, Alert, Input, styled } from "@mui/material";
import { uploadQuantitativeGrades, uploadQualitativeGrades } from "../services/UploadGrades"; // Asegúrate de cambiar el path al correcto

const StyledCard = styled(Card)(({ theme }) => ({
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#f44336', // Rojo
    color: '#fff',
    '&:hover': {
        backgroundColor: '#d32f2f', // Rojo oscuro
    },
    marginTop: theme.spacing(2),
}));

const FileInput = styled(Input)(({ theme }) => ({
    display: 'none',
}));

const FileUploadComponent: React.FC<{ token: string }> = ({ token }) => {
    const [qualitativeFile, setQualitativeFile] = useState<File | null>(null);
    const [quantitativeFile, setQuantitativeFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<"success" | "error" | undefined>(undefined);

    const handleQualitativeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setQualitativeFile(event.target.files[0]);
        }
    };

    const handleQuantitativeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setQuantitativeFile(event.target.files[0]);
        }
    };

    const handleUploadQualitative = async () => {
        if (!qualitativeFile) {
            setAlertMessage("Por favor, selecciona un archivo para calificaciones cualitativas.");
            setAlertType("error");
            return;
        }
        setLoading(true);
        const response = await uploadQualitativeGrades(token, qualitativeFile);
        setLoading(false);

        if (response && 'error' in response) {
            setAlertMessage(response.error);
            setAlertType("error");
        } else {
            setAlertMessage("Calificaciones cualitativas subidas correctamente.");
            setAlertType("success");
        }

        // Limpiar archivo
        setQualitativeFile(null);
        setTimeout(() => {
            setAlertMessage(null);
            setAlertType(undefined);
        }, 3000);
    };

    const handleUploadQuantitative = async () => {
        if (!quantitativeFile) {
            setAlertMessage("Por favor, selecciona un archivo para calificaciones cuantitativas.");
            setAlertType("error");
            return;
        }
        setLoading(true);
        const response = await uploadQuantitativeGrades(token, quantitativeFile);
        setLoading(false);

        if (response && 'error' in response) {
            setAlertMessage(response.error);
            setAlertType("error");
        } else {
            setAlertMessage("Calificaciones cuantitativas subidas correctamente.");
            setAlertType("success");
        }

        // Limpiar archivo
        setQuantitativeFile(null);
        setTimeout(() => {
            setAlertMessage(null);
            setAlertType(undefined);
        }, 3000);
    };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {loading && <CircularProgress />}

            {alertMessage && alertType && (
                <Alert severity={alertType}>{alertMessage}</Alert>
            )}

            {/* Tarjeta para calificaciones cualitativas */}
            <StyledCard>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Subir Calificaciones Cualitativas
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {qualitativeFile ? `Archivo seleccionado: ${qualitativeFile.name}` : "No se ha seleccionado ningún archivo"}
                    </Typography>
                    <input
                        accept=".xlsx"
                        id="upload-qualitative"
                        type="file"
                        onChange={handleQualitativeFileChange}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="upload-qualitative">
                        <Button variant="contained" color="primary" component="span">
                            Seleccionar Archivo
                        </Button>
                    </label>
                    <StyledButton
                        onClick={handleUploadQualitative}
                        disabled={loading || !qualitativeFile}
                    >
                        Enviar Cualitativas
                    </StyledButton>
                </CardContent>
            </StyledCard>

            {/* Tarjeta para calificaciones cuantitativas */}
            <StyledCard>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Subir Calificaciones Cuantitativas
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {quantitativeFile ? `Archivo seleccionado: ${quantitativeFile.name}` : "No se ha seleccionado ningún archivo"}
                    </Typography>
                    <input
                        accept=".xlsx"
                        id="upload-quantitative"
                        type="file"
                        onChange={handleQuantitativeFileChange}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="upload-quantitative">
                        <Button variant="contained" color="primary" component="span">
                            Seleccionar Archivo
                        </Button>
                    </label>
                    <StyledButton
                        onClick={handleUploadQuantitative}
                        disabled={loading || !quantitativeFile}
                    >
                        Enviar Cuantitativas
                    </StyledButton>
                </CardContent>
            </StyledCard>
        </Box>
    );
};

export default FileUploadComponent;
