// import React from 'react';
// import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import { WordCloudResponse } from '../types/TeacherTypes';

// interface WordCloudProps {
//   data: WordCloudResponse
// }

// const WordCloud: React.FC<WordCloudProps> = ({ data }) => {
//   const imageSrc = `data:image/png;base64,${data.wordcloud}`;
//   const palabrasMasFrecuentes = data.palabras_mas_frecuentes;

//   return (
//     <Grid sx={{ padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
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

// import React from 'react';
// import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import { WordCloudResponse } from '../types/TeacherTypes';

// interface WordCloudProps {
//   data: WordCloudResponse;
// }

// const WordCloud: React.FC<WordCloudProps> = ({ data }) => {
//   const imageSrc = `data:image/png;base64,${data.wordcloud}`;
//   const palabrasMasFrecuentes = data.palabras_mas_frecuentes;

//   return (
//     <Grid sx={{ padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
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
//                   <TableRow sx={{ height: '30px' }}> {/* Ajuste la altura de la cabecera */}
//                     <TableCell align="center"><strong>Palabra</strong></TableCell>
//                     <TableCell align="center"><strong>Número de Apariciones</strong></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {palabrasMasFrecuentes.map(([palabra, count], index) => (
//                     <TableRow key={index} sx={{ height: '30px' }}> {/* Ajuste la altura de las filas */}
//                       <TableCell align="center" sx={{ padding: '6px 16px' }}>{palabra}</TableCell>
//                       <TableCell align="center" sx={{ padding: '6px 16px' }}>{count}</TableCell>
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
  data: WordCloudResponse;
}

const WordCloud: React.FC<WordCloudProps> = ({ data }) => {
  const imageSrc = `data:image/png;base64,${data.wordcloud}`;
  const palabrasMasFrecuentes = data.palabras_mas_frecuentes;

  return (
    <Grid sx={{ padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      {imageSrc ? (
        <>
          <img src={imageSrc} alt="Word Cloud" style={{ maxWidth: '100%', height: 'auto' }} />
          <Typography variant="h6" sx={{ marginTop: '20px', marginBottom: '10px' }}>
            Palabras más repetidas
          </Typography>
          {palabrasMasFrecuentes ? (
            <TableContainer component={Paper} sx={{ borderRadius: '10px' }}>
              <Table sx={{ minWidth: 300, borderRadius: '10px', overflow: 'hidden' }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'red' }}>
                    <TableCell align="center" sx={{ color: 'white' }}><strong>Palabra</strong></TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}><strong>Número de Apariciones</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {palabrasMasFrecuentes.map(([palabra, count], index) => (
                    <TableRow key={index} sx={{ height: '24px' }}>
                      <TableCell align="center" sx={{ padding: '6px 16px' }}>{palabra}</TableCell>
                      <TableCell align="center" sx={{ padding: '6px 16px' }}>{count}</TableCell>
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

