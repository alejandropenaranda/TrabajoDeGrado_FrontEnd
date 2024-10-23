/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid } from "@mui/material";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { getUsers } from "../services/UserManagementService";
import { ColumnConfig } from "../types/GeneralTypes";
import UsersTableComponent from "../components/UsersTable";

const UserManagement: React.FC = () => {
    const auth = useAuth();
    const token = auth.getAccessToken();

    const [usersData, setUsersData] = useState<any>(null)

    useEffect(() => {
        const fetchUsersData = async () => {
            const data = await getUsers(token);
            setUsersData(data);
        };
        fetchUsersData();
    }, [token]);

    const columns: ColumnConfig[] = [
        { headerName: 'Docente', fieldName: 'nombre' },
        { headerName: 'Correo electronico', fieldName: 'email' },
        { headerName: 'Codigo', fieldName: 'codigo' },
        { headerName: 'Es director', fieldName: 'is_director' },
        { headerName: 'Escuela', fieldName: 'escuela.nombre' },
    ];

    console.log (usersData);

    return (
        <>
            <SideBar>
                <Grid sx={{height: '100%', mt: 5}}>
                    {usersData && (
                        <UsersTableComponent name={"Gestionar usuarios"} columns={columns} data={usersData} token={token}/>
                    )}
                </Grid>
            </SideBar>
            
        </>
    )
}

export default UserManagement;
