import { Grid } from "@mui/material";
import SideBar from "../components/SideBar";
import { useAuth } from "../auth/AuthProvider";
import { useEffect, useState } from "react";
import { getFacSchoolAverageGrades } from "../services/FacSchoolAverageGrades";
import DirectorGradesCards from "../components/DirectorGradesCards";
import DirectorBarChart from "../components/DirectorBarChart";
import WelcomeUserCard from "../components/WelcomeUser";
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
            <Grid container spacing={3} sx={{ height: 'auto', pt: 2 }}>
                {/* Primera fila */}
                <Grid item xs={12}>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid item xs={12} md={4}>
                            <WelcomeUserCard nombre={user.nombre} token={token} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {facSchoolAverageGradesData && (
                                <DirectorGradesCards data={facSchoolAverageGradesData} escuela={user.escuela.nombre} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {facSchoolAverageGradesData && (
                                <DirectorBarChart data={facSchoolAverageGradesData} />
                            )}
                        </Grid>
                    </Grid>
                </Grid>

                {/* Segunda fila */}
                <Grid item xs={12}>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid item xs={12} md={6}>
                            {schoolTeacherRankingData && (
                                <TeacherRankingTable data={schoolTeacherRankingData} escuela={user.escuela.nombre} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={6} display={'flex'}>
                            {schoolFortDebData && (
                                <SchoolFortDeb valoraciones={schoolFortDebData.valoraciones} />
                            )}
                        </Grid>
                    </Grid>
                </Grid>

                {/* Tercera fila */}
                <Grid item xs={12}>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid item xs={12}>
                            {schoolTeacherAvergeGradesData && facSchoolAverageGradesData && (
                                <SchoolTeachersChart data={schoolTeacherAvergeGradesData} schoolData={facSchoolAverageGradesData} />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </SideBar>
    );
};

export default DirectorDashboard;
