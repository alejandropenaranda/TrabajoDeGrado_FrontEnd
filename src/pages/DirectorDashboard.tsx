// import { Grid } from "@mui/material";
// import SideBar from "../components/SideBar";
// import { useAuth } from "../auth/AuthProvider";
// import { useEffect, useState } from "react";
// import { getFacSchoolAverageGrades } from "../services/FacSchoolAverageGrades";
// import DirectorGradesCards from "../components/DirectorGradesCards";
// import DirectorBarChart from "../components/DirectorBarChart";
// import WelcomeUserCard from "../components/WelcomeUser";
// import DirectorRedirectionButtons from "../components/DirectorRedirectionButtons";
// import { getSchoolTeacherRanking } from "../services/TeacherRanking";
// import TeacherRankingTable from "../components/TeacherRanking";

// const DirectorDashboard: React.FC<{}> = ({ }) => {

//     const auth = useAuth();
//     const user = auth.getUser();
//     const token = auth.getAccessToken();

//     if (!user) {
//         return <p>User not found</p>;
//     }

//     const [facSchoolAverageGradesData, setFacSchoolAverageGradesData] = useState<any>(null);
//     const [schoolTeacherRankingData, setSchoolTeacherRankingData] = useState<any>(null);

//     useEffect(() => {
//         const fetchFacSchoolAverageGradesData = async () => {
//             const data = await getFacSchoolAverageGrades(token, user.escuela.id);
//             setFacSchoolAverageGradesData(data);
//         };
//         const fetchSchoolTeacherRankingData = async () => {
//             const data = await getSchoolTeacherRanking(token, user.escuela.id);
//             setSchoolTeacherRankingData(data);
//         };

//         fetchFacSchoolAverageGradesData();
//         fetchSchoolTeacherRankingData();
//     }, [token, user.escuela.id]);

//     return (
//         <>
//             <SideBar>
//                 <Grid container spacing={3} sx={{ mt: 5, height: '100vh' }}>
//                     <Grid item xs={4}>
//                         <WelcomeUserCard nombre={user.nombre} />

//                         {schoolTeacherRankingData && (<TeacherRankingTable data={schoolTeacherRankingData} escuela={user.escuela.nombre}/>)}
//                     </Grid>

//                     <Grid item xs={4}>
//                         <Grid container spacing={3}>
//                             <Grid item xs={12}>
//                                 {facSchoolAverageGradesData && (
//                                     <DirectorGradesCards data={facSchoolAverageGradesData} escuela={user.escuela.nombre} />
//                                 )}
//                             </Grid>

//                             <Grid item xs={12}>
//                                 {facSchoolAverageGradesData && (
//                                     <DirectorBarChart data={facSchoolAverageGradesData} />
//                                 )}
//                             </Grid>
//                         </Grid>
//                     </Grid>

//                     <Grid item xs={4}>
//                         <DirectorRedirectionButtons />
//                     </Grid>
//                 </Grid>
//             </SideBar>
//         </>
//     );
// };

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
import { getSchoolTeacherRanking } from "../services/TeacherRanking";
import TeacherRankingTable from "../components/TeacherRanking";
import { getSchoolTeacherAverageGrades } from "../services/SchoolTeacherAverageGrades";
import SchoolTeachersChart from "../components/SchoolTeachersCharts";
import { getSchoolFortDeb } from "../services/FortDeb";
import SchoolFortDeb from "../components/SchoolFortDebViewer";

const DirectorDashboard: React.FC<{}> = () => {
    const auth = useAuth();
    const user = auth.getUser();
    const token = auth.getAccessToken();

    if (!user) {
        return <p>User not found</p>;
    }

    const [facSchoolAverageGradesData, setFacSchoolAverageGradesData] = useState<any>(null);
    const [schoolTeacherRankingData, setSchoolTeacherRankingData] = useState<any>(null);
    const [schoolTeacherAvergeGradesData, setSchoolTeacherAvergeGradesData] = useState<any>(null);
    const [schoolFortDebData, setSchoolFortDebData] = useState<any>(null);

    useEffect(() => {
        const fetchFacSchoolAverageGradesData = async () => {
            const data = await getFacSchoolAverageGrades(token, user.escuela.id);
            setFacSchoolAverageGradesData(data);
        };
        const fetchSchoolTeacherRankingData = async () => {
            const data = await getSchoolTeacherRanking(token, user.escuela.id);
            setSchoolTeacherRankingData(data);
        };

        const fetchSchoolTeacherAvergeGradesData = async () => {
            const data = await getSchoolTeacherAverageGrades(token, user.escuela.id);
            setSchoolTeacherAvergeGradesData(data);
        };

        const fetchschoolFortDebData = async () => {
            const data = await getSchoolFortDeb(token, user.escuela.id);
            setSchoolFortDebData(data);
        };

        fetchFacSchoolAverageGradesData();
        fetchSchoolTeacherRankingData();
        fetchSchoolTeacherAvergeGradesData();
        fetchschoolFortDebData();
    }, [token, user.escuela.id]);

    return (
        <SideBar>
            <Grid container>
                {schoolTeacherAvergeGradesData && (
                    <SchoolTeachersChart data={schoolTeacherAvergeGradesData} schoolData={facSchoolAverageGradesData}/>
                )}

                {schoolFortDebData && (
                    <SchoolFortDeb valoraciones={schoolFortDebData.valoraciones}/>
                )}
            </Grid>
            <Grid container spacing={3} sx={{ mt: 5, height: '100vh', p: 2 }}>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <WelcomeUserCard nombre={user.nombre} />
                        </Grid>
                        <Grid item xs={12}>
                            {schoolTeacherRankingData && (
                                <TeacherRankingTable data={schoolTeacherRankingData} escuela={user.escuela.nombre} />
                            )}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {facSchoolAverageGradesData && (
                                <DirectorGradesCards data={facSchoolAverageGradesData} escuela={user.escuela.nombre} />
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            {facSchoolAverageGradesData && (
                                <DirectorBarChart data={facSchoolAverageGradesData} />
                            )}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <DirectorRedirectionButtons />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </SideBar>
    );
};

export default DirectorDashboard;
