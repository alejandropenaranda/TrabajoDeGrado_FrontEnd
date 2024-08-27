// import React, { useEffect, useState } from 'react';
// import { getWordCloud } from "../services/wordCloud";
// import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// interface WordCloudProps {
//   token: string;
//   id: number;
// }

// const WordCloud: React.FC<WordCloudProps> = ({ token, id }) => {
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [palabrasMasFrecuentes, setPalabrasMasFrecuentes] = useState<[string, number][] | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Llama a la API usando la función getWordCloud
//         const response = await getWordCloud(token, id);

//         // Verifica si la respuesta es exitosa y contiene la imagen en base64
//         if (response && 'wordcloud' in response) {
//           const imageUrl = `data:image/png;base64,${response.wordcloud}`;
//           setImageSrc(imageUrl);
//           console.log(response)
//           setPalabrasMasFrecuentes(response.palabras_mas_frecuentes)
//         } else if (response && 'error' in response) {
//           setError(response.error);
//         } else {
//           setError('Unexpected error');
//         }        
//       } catch (error) {
//         setError('Failed to fetch image');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [token, id]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <Grid sx={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
//       {imageSrc ? (
//         <>
//           <img src={imageSrc} alt="Word Cloud" style={{ maxWidth: '100%', height: 'auto' }} />
//           <Typography variant="h6" sx={{ marginTop: '20px', marginBottom: '10px' }}>
//             Palabras más repetidas
//           </Typography>
//           {palabrasMasFrecuentes ? (
//             <TableContainer component={Paper}>
//               <Table sx={{ minWidth: 300 }} aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell align="center"><strong>Palabra</strong></TableCell>
//                     <TableCell align="center"><strong>Número de Apariciones</strong></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {palabrasMasFrecuentes.map(([palabra, count], index) => (
//                     <TableRow key={index}>
//                       <TableCell align="center">{palabra}</TableCell>
//                       <TableCell align="center">{count}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           ) : (
//             <p>No hay datos disponibles</p>
//           )}
//         </>
//       ) : (
//         <p>No image available</p>
//       )}
//     </Grid>
//   );
// };

// export default WordCloud;

import React from 'react';
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { WordCloudResponse } from '../types/TeacherTypes';

interface WordCloudProps {
  data: WordCloudResponse
}

const WordCloud: React.FC<WordCloudProps> = ({ data }) => {
  const imageSrc = `data:image/png;base64,${data.wordcloud}`;
  const palabrasMasFrecuentes = data.palabras_mas_frecuentes;

  return (
    <Grid sx={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
      {imageSrc ? (
        <>
          <img src={imageSrc} alt="Word Cloud" style={{ maxWidth: '100%', height: 'auto' }} />
          <Typography variant="h6" sx={{ marginTop: '20px', marginBottom: '10px' }}>
            Palabras más repetidas
          </Typography>
          {palabrasMasFrecuentes ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><strong>Palabra</strong></TableCell>
                    <TableCell align="center"><strong>Número de Apariciones</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {palabrasMasFrecuentes.map(([palabra, count], index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{palabra}</TableCell>
                      <TableCell align="center">{count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <p>No hay datos disponibles</p>
          )}
        </>
      ) : (
        <p>No image available</p>
      )}
    </Grid>
  );
};

export default WordCloud;