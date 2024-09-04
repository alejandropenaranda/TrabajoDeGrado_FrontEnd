// import { Grid } from "@mui/material";
// import SideBar from "../components/SideBar";
// import { useAuth } from "../auth/AuthProvider";
// import { useEffect, useState } from "react";
// import { getFacSchoolAverageGrades } from "../services/FacSchoolAverageGrades";
// import DirectorGradesCards from "../components/DirectorGradesCards";
// import DirectorBarChart from "../components/DirectorBarChart";
// import WelcomeUserCard from "../components/WelcomeUser";
// import DirectorRedirectionButtons from "../components/DirectorRedirectionButtons";

// const DirectorDashboard: React.FC<{}> = ({}) => {
    
//     const auth = useAuth();
//     const user = auth.getUser();
//     const token = auth.getAccessToken();

//     if (!user) {
//         return <p>User not found</p>;
//     }

//     const [facSchoolAverageGradesData, setFacSchoolAverageGradesData] = useState<any>(null)

//     useEffect(() => {
//         const fetchFacSchoolAverageGradesData = async () => {
//           const data = await getFacSchoolAverageGrades(token, user.escuela.id);
//           setFacSchoolAverageGradesData(data);
//         };
//         fetchFacSchoolAverageGradesData();
//       }, [ ]);



//     return (
//         <>
//             <SideBar>
//                 <Grid container display={"flex"} direction={'row'} xs={12} sx={{mt:5, height: '100vh'}} >
//                     <Grid item xs={4}>
//                         <WelcomeUserCard nombre={user.nombre}/>
//                     </Grid>
//                     <Grid item xs={4}>
//                         {facSchoolAverageGradesData && <DirectorGradesCards data={facSchoolAverageGradesData} escuela={user.escuela.nombre}/>}

//                         {facSchoolAverageGradesData && <DirectorBarChart data={facSchoolAverageGradesData} nombre={"Calificación general"}/>}
//                     </Grid>
//                     <Grid item xs={4}>
//                         <DirectorRedirectionButtons/>
//                     </Grid>
//                 </Grid>
//             </SideBar>
            
//         </>
//     )
// }

// export default DirectorDashboard;

import { Grid } from "@mui/material";
import SideBar from "../components/SideBar";
import { useAuth } from "../auth/AuthProvider";
import { useEffect, useState } from "react";
import { getFacSchoolAverageGrades } from "../services/FacSchoolAverageGrades";
import DirectorGradesCards from "../components/DirectorGradesCards";
import DirectorBarChart from "../components/DirectorBarChart";
import WelcomeUserCard from "../components/WelcomeUser";
import DirectorRedirectionButtons from "../components/DirectorRedirectionButtons";

const DirectorDashboard: React.FC<{}> = ({}) => {
    
    const auth = useAuth();
    const user = auth.getUser();
    const token = auth.getAccessToken();

    if (!user) {
        return <p>User not found</p>;
    }

    const [facSchoolAverageGradesData, setFacSchoolAverageGradesData] = useState<any>(null);

    useEffect(() => {
        const fetchFacSchoolAverageGradesData = async () => {
          const data = await getFacSchoolAverageGrades(token, user.escuela.id);
          setFacSchoolAverageGradesData(data);
        };
        fetchFacSchoolAverageGradesData();
      }, [token, user.escuela.id]);

    return (
        <>
            <SideBar>
                <Grid container spacing={3} sx={{ mt: 5, height: '100vh' }}>
                    <Grid item xs={4}>
                        <WelcomeUserCard nombre={user.nombre}/>
                    </Grid>

                    <Grid item xs={4}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {facSchoolAverageGradesData && (
                                    <DirectorGradesCards data={facSchoolAverageGradesData} escuela={user.escuela.nombre}/>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                {facSchoolAverageGradesData && (
                                    <DirectorBarChart data={facSchoolAverageGradesData} nombre={"Calificación general"}/>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={4}>
                        <DirectorRedirectionButtons/>
                    </Grid>
                </Grid>
            </SideBar>
        </>
    );
};

export default DirectorDashboard;
