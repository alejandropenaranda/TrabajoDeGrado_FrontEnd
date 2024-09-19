import React from 'react';
import { Grid, Paper, Box, Typography, FormControlLabel, Checkbox, Switch } from '@mui/material';

interface UsersTableFilterProps {
    schools: string[];
    selectedSchools: string[];
    isDirectorChecked: boolean;
    isAdminChecked: boolean;
    onSchoolChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDirectorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onAdminChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UsersTableFilter: React.FC<UsersTableFilterProps> = ({
    schools,
    selectedSchools,
    isDirectorChecked,
    isAdminChecked,
    onSchoolChange,
    onDirectorChange,
    onAdminChange
}) => {
    return (
        <Paper elevation={3} sx={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
            <Box sx={{ backgroundColor: 'red', padding: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>Filtros</Typography>
            </Box>
            <Grid container sx={{ padding: 2 }} spacing={2}>
                {/* Columna izquierda - Filtro de Escuela */}
                <Grid item xs={6}>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>Escuela</Typography>
                    {schools.map(school => (
                        <FormControlLabel
                            key={school}
                            control={
                                <Checkbox
                                    name={school}
                                    checked={selectedSchools.includes(school)}
                                    onChange={onSchoolChange}
                                />
                            }
                            label={school}
                        />
                    ))}
                </Grid>

                {/* Columna derecha - Filtros de Es Director y Es Admin */}
                <Grid item xs={6}>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>Filtros</Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                name="is_director"
                                checked={isDirectorChecked}
                                onChange={onDirectorChange}
                            />
                        }
                        label="Es Director"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                name="is_admin"
                                checked={isAdminChecked}
                                onChange={onAdminChange}
                            />
                        }
                        label="Es Admin"
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UsersTableFilter;
