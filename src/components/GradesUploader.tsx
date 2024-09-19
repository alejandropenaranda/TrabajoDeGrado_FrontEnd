// import React, { useState } from "react";
// import { Box, Card, CardContent, Typography, Button, CircularProgress, Alert, Tooltip, IconButton } from "@mui/material";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// import { uploadQuantitativeGrades, uploadQualitativeGrades } from "../services/UploadGrades"; // Asegúrate de cambiar el path al correcto

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

//         if (response && 'error' in response) {
//             setAlertMessage(response.error);
//             setAlertType("error");
//         } else {
//             setAlertMessage("Calificaciones cualitativas subidas correctamente.");
//             setAlertType("success");
//         }

//         setQualitativeFile(null);
//         setTimeout(() => {
//             setAlertMessage(null);
//             setAlertType(undefined);
//         }, 3000);
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

//         if (response && 'error' in response) {
//             setAlertMessage(response.error);
//             setAlertType("error");
//         } else {
//             setAlertMessage("Calificaciones cuantitativas subidas correctamente.");
//             setAlertType("success");
//         }

//         setQuantitativeFile(null);
//         setTimeout(() => {
//             setAlertMessage(null);
//             setAlertType(undefined);
//         }, 3000);
//     };

//     return (
//         <Box display="flex" flexDirection="column" gap={2}>
//             {loading && <CircularProgress />}

//             {alertMessage && alertType && (
//                 <Alert severity={alertType}>{alertMessage}</Alert>
//             )}

//             <Card
//                 sx={{
//                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//                     borderRadius: '10px',
//                     position: 'relative',
//                     paddingBottom: 2,
//                 }}
//             >
//                 <CardContent>
//                     <Tooltip title="Los archivos de calificaciones cualitativas deben contener las columnas:
//                                     'SEMESTRE', 'DOCENTE', 'CEDULA', 'ESCUELA', 'COMENTARIO', 'MATERIA' y 'CODIGO_MATERIA'
//                                     para su correcto procesamiento. Ademas no deben haber informaciones faltantes para ningun registro.">
//                         <IconButton
//                             sx={{
//                                 position: 'absolute',
//                                 top: 8,
//                                 right: 8,
//                             }}
//                         >
//                             <HelpOutlineIcon />
//                         </IconButton>
//                     </Tooltip>
//                     <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//                         Subir Calificaciones Cualitativas
//                     </Typography>
//                     <Box display="flex" alignItems="center" gap={1}>
//                         <label htmlFor="upload-qualitative">
//                             <input
//                                 accept=".xlsx"
//                                 id="upload-qualitative"
//                                 type="file"
//                                 onChange={handleQualitativeFileChange}
//                                 style={{ display: 'none' }}
//                             />
//                             <Button variant="contained" color="primary" component="span">
//                                 Seleccionar Archivo
//                             </Button>
//                         </label>
//                         <Typography variant="body2" color="textSecondary">
//                             {qualitativeFile ? `Archivo seleccionado: ${qualitativeFile.name}` : "No se ha seleccionado ningún archivo"}
//                         </Typography>
//                     </Box>
//                     <Button
//                         sx={{
//                             backgroundColor: qualitativeFile ? 'red' : 'lightgray',
//                             color: qualitativeFile ? 'white' : 'black',
//                             '&:hover': {
//                                 backgroundColor: qualitativeFile ? 'darkred' : 'lightgray',
//                             },
//                             position: 'absolute',
//                             bottom: 16,
//                             right: 16,
//                         }}
//                         onClick={handleUploadQualitative}
//                         disabled={loading || !qualitativeFile}
//                     >
//                         Enviar Archivo
//                     </Button>
//                 </CardContent>
//             </Card>

//             <Card
//                 sx={{
//                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//                     borderRadius: '10px',
//                     position: 'relative',
//                     paddingBottom: 2,
//                 }}
//             >
//                 <CardContent>
//                     <Tooltip title="Los archivos de calificaciones cuantitativas deben contener las columnas:
//                                     'SEMESTRE', 'DOCENTE', 'CEDULA', 'ESCUELA', 'PROM_PREGUNTA9', 'PROM_PREGUNTA10',
//                                     'PROM_PREGUNTA11', 'PROM_PREGUNTA12', 'PROM_PREGUNTA13', 'PROM_PREGUNTA14', 
//                                     'PROM_PREGUNTA15', 'PROM_PREGUNTA16', 'PROM_PREGUNTA17', 'PROM_PREGUNTA18',    
//                                     'PROM_PREGUNTA19', 'PROM_PREGUNTA20', 'PROM_DOCENTE', 'MATERIA' y 'CODIGO_MATERIA'
//                                     para su correcto procesamiento. Ademas no deben haber informaciones faltantes para ningun registro.">
//                         <IconButton
//                             sx={{
//                                 position: 'absolute',
//                                 top: 8,
//                                 right: 8,
//                             }}
//                         >
//                             <HelpOutlineIcon />
//                         </IconButton>
//                     </Tooltip>
//                     <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//                         Subir Calificaciones Cuantitativas
//                     </Typography>
//                     <Box display="flex" alignItems="center" gap={1}>
//                         <label htmlFor="upload-quantitative">
//                             <input
//                                 accept=".xlsx"
//                                 id="upload-quantitative"
//                                 type="file"
//                                 onChange={handleQuantitativeFileChange}
//                                 style={{ display: 'none' }}
//                             />
//                             <Button variant="contained" color="primary" component="span">
//                                 Seleccionar Archivo
//                             </Button>
//                         </label>
//                         <Typography variant="body2" color="textSecondary">
//                             {quantitativeFile ? `Archivo seleccionado: ${quantitativeFile.name}` : "No se ha seleccionado ningún archivo"}
//                         </Typography>
//                     </Box>
//                     <Button
//                         sx={{
                            // backgroundColor: quantitativeFile ? 'red' : 'lightgray',
                            // color: quantitativeFile ? 'white' : 'black',
                            // '&:hover': {
                            //     backgroundColor: quantitativeFile ? 'darkred' : 'lightgray',
                            // },
//                             position: 'absolute',
//                             bottom: 16,
//                             right: 16,
//                         }}
//                         onClick={handleUploadQuantitative}
//                         disabled={loading || !quantitativeFile}
//                     >
//                         Enviar Archivo
//                     </Button>
//                 </CardContent>

// import React, { useState, useId } from "react";
// import {
//     Box,
//     Card,
//     CardContent,
//     Typography,
//     Button,
//     CircularProgress,
//     Alert,
//     IconButton,
//     Tooltip,
// } from "@mui/material";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

// interface FileUploadComponentProps {
//     token: string;
//     title: string;
//     helpMessage: string;
//     uploadService: (token: string, file: File) => Promise<any>;
// }

// const FileUploadComponent: React.FC<FileUploadComponentProps> = ({
//     token,
//     title,
//     helpMessage,
//     uploadService,
// }) => {
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [alertMessage, setAlertMessage] = useState<string | null>(null);
//     const [alertType, setAlertType] = useState<"success" | "error" | undefined>(undefined);

//     // Hook para generar un ID único para el input de archivo
//     const inputId = useId();

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files) {
//             setSelectedFile(event.target.files[0]);
//         }
//     };

//     const handleUpload = async () => {
//         if (!selectedFile) {
//             setAlertMessage("Por favor, selecciona un archivo.");
//             setAlertType("error");
//             return;
//         }
//         setLoading(true);
//         const response = await uploadService(token, selectedFile);
//         setLoading(false);

//         if (response && 'error' in response) {
//             setAlertMessage(response.error);
//             setAlertType("error");
//         } else {
//             setAlertMessage("Archivo subido correctamente.");
//             setAlertType("success");
//         }

//         setSelectedFile(null);
//         setTimeout(() => {
//             setAlertMessage(null);
//             setAlertType(undefined);
//         }, 3000);
//     };

//     return (
//         <Box display="flex" flexDirection="column" gap={2}>
//             {loading && <CircularProgress />}
//             {alertMessage && alertType && (
//                 <Alert severity={alertType}>{alertMessage}</Alert>
//             )}

//             <Card
//                 sx={{
//                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//                     borderRadius: "10px",
//                     padding: 2,
//                 }}
//             >
//                 <CardContent>
//                     <Box display="flex" justifyContent="space-between" alignItems="center">
//                         <Typography variant="h6" fontWeight="bold">
//                             {title}
//                         </Typography>
//                         <Tooltip title={helpMessage}>
//                             <IconButton>
//                                 <HelpOutlineIcon />
//                             </IconButton>
//                         </Tooltip>
//                     </Box>

//                     <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
//                         {selectedFile ? `Archivo seleccionado: ${selectedFile.name}` : "No se ha seleccionado ningún archivo"}
//                     </Typography>
//                     <Box display="flex" alignItems="center" sx={{ marginTop: 2 }}>
//                         <label htmlFor={inputId}>
//                             <Button variant="contained" component="span" sx={{ marginRight: 2 }}>
//                                 Seleccionar Archivo
//                             </Button>
//                         </label>
//                         <input
//                             accept=".xlsx"
//                             id={inputId}
//                             type="file"
//                             onChange={handleFileChange}
//                             style={{ display: "none" }}
//                         />
//                     </Box>

//                     <Button
//                         onClick={handleUpload}
//                         disabled={loading || !selectedFile}
//                         sx={{
//                             backgroundColor: selectedFile ? 'red' : 'lightgray',
//                             color: selectedFile ? 'white' : 'black',
//                             '&:hover': {
//                                 backgroundColor: selectedFile ? 'darkred' : 'lightgray',
//                             },
//                             marginTop: 2,
//                             display: "block",
//                             marginLeft: "auto",
//                         }}
//                     >
//                         Enviar
//                     </Button>
//                 </CardContent>
//             </Card>
//         </Box>
//     );
// };

// export default FileUploadComponent;

import React, { useState, useId } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    CircularProgress,
    Snackbar,
    Alert,
    IconButton,
    Tooltip,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface FileUploadComponentProps {
    token: string;
    title: string;
    helpMessage: string;
    uploadService: (token: string, file: File) => Promise<any>;
}

interface Feedback {
    message: string;
    type: "success" | "error";
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({
    token,
    title,
    helpMessage,
    uploadService,
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<Feedback | null>(null);

    // Hook para generar un ID único para el input de archivo
    const inputId = useId();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setFeedback({
                message: "Por favor, selecciona un archivo.",
                type: "error",
            });
            return;
        }
        setLoading(true);
        const response = await uploadService(token, selectedFile);
        setLoading(false);

        if (response && 'error' in response) {
            setFeedback({ message: response.error, type: "error" });
        } else {
            setFeedback({ message: "Archivo subido correctamente.", type: "success" });
        }

        setSelectedFile(null);

        setTimeout(() => {
            setFeedback(null);
        }, 3000);
    };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {loading && <CircularProgress />}

            {feedback && (
                <Snackbar
                    open={!!feedback}
                    autoHideDuration={2000}
                    onClose={() => setFeedback(null)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    sx={{ marginTop: '70px' }}
                >
                    <Alert
                        severity={feedback.type}
                        sx={{ width: 'auto' }}
                    >
                        {feedback.message}
                    </Alert>
                </Snackbar>
            )}

            <Card
                sx={{
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    borderRadius: "10px",
                    padding: 2,
                }}
            >
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" fontWeight="bold" align="center">
                            {title}
                        </Typography>
                        <Tooltip title={helpMessage}>
                            <IconButton>
                                <HelpOutlineIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
                        {selectedFile ? `Archivo seleccionado: ${selectedFile.name}` : "No se ha seleccionado ningún archivo"}
                    </Typography>
                    <Box display="flex" alignItems="center" sx={{ marginTop: 2 }}>
                        <label htmlFor={inputId}>
                            <Button variant="contained" component="span" sx={{ marginRight: 2 }}>
                                Seleccionar Archivo
                            </Button>
                        </label>
                        <input
                            accept=".xlsx"
                            id={inputId}
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                    </Box>

                    <Button
                        onClick={handleUpload}
                        disabled={loading || !selectedFile}
                        sx={{
                            backgroundColor: selectedFile ? 'red' : 'lightgray',
                            color: selectedFile ? 'white' : 'black',
                            '&:hover': {
                                backgroundColor: selectedFile ? 'darkred' : 'lightgray',
                            },
                            marginTop: 2,
                            display: "block",
                            marginLeft: "auto",
                        }}
                    >
                        Enviar
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default FileUploadComponent;


