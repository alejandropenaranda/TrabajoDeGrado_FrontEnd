import React from 'react';
import { Grid, Paper, Box, Typography, FormControlLabel, Checkbox } from '@mui/material';

interface FiltersComponentProps {
    periods: string[];
    schools: string[];
    subjects: string[];
    selectedPeriods: string[];
    selectedSchools: string[];
    selectedSubjects: string[];
    onPeriodChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSchoolChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubjectChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    showSchoolFilter: boolean;
    showSubjectFilter: boolean;
}

const FiltersComponent: React.FC<FiltersComponentProps> = ({
    periods,
    schools,
    subjects,
    selectedPeriods,
    selectedSchools,
    selectedSubjects,
    onPeriodChange,
    onSchoolChange,
    onSubjectChange,
    showSchoolFilter,
    showSubjectFilter
}) => {
    return (
        <Paper elevation={3} sx={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
            <Box sx={{ backgroundColor: 'red', padding: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>Filtros</Typography>
            </Box>
            <Grid container sx={{ padding: 2 }}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>Período</Typography>
                    {periods.map(period => (
                        <FormControlLabel
                            key={period}
                            control={<Checkbox name={period} checked={selectedPeriods.includes(period)} onChange={onPeriodChange} />}
                            label={period}
                        />
                    ))}
                </Grid>
                {showSchoolFilter && (
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" sx={{ marginBottom: 2 }}>Escuela</Typography>
                        {schools.map(school => (
                            <FormControlLabel
                                key={school}
                                control={<Checkbox name={school} checked={selectedSchools.includes(school)} onChange={onSchoolChange} />}
                                label={school}
                            />
                        ))}
                    </Grid>
                )}
                {showSubjectFilter && (
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" sx={{ marginBottom: 2 }}>Código materia</Typography>
                        {subjects.map(subject => (
                            <FormControlLabel
                                key={subject}
                                control={<Checkbox name={subject} checked={selectedSubjects.includes(subject)} onChange={onSubjectChange} />}
                                label={subject}
                            />
                        ))}
                    </Grid>
                )}
            </Grid>
        </Paper>
    );
};

export default FiltersComponent;
