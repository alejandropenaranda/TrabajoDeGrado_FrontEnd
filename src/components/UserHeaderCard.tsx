import React, { useState } from 'react';
import { Typography, Avatar, Grid, Menu, MenuItem } from '@mui/material';
import { User } from '../types/types';
import { useAuth } from '../auth/AuthProvider';

const UserHeaderCard = ({}) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const auth = useAuth();

    const handleSingOut = () => {
      auth.signOut()
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    const user = JSON.parse(localStorage.getItem("user") || '{}') as User;

    const getRole = () => {
      if (user.is_admin) return 'Administrador';
      if (user.is_director) return 'Director de Escuela';
      if (user.is_profesor) return 'Docente';
      return 'Usuario';
  };
    return (
        <>
          <Grid container direction="row" alignItems="center" justifyContent="flex-end" gap={2} sx={{ width: 'auto', cursor: 'pointer' }}  onClick={handleClick}>
              <Grid item>
                  <Typography variant="body1" fontWeight="normal">
                      {user.nombre} - <span style={{ color: 'red', fontWeight: "bold" }}>{getRole()}</span>
                  </Typography>
              </Grid>
              <Avatar 
                  src='./avatar.png' 
                  alt="User Avatar"
                  sx={{ width: 60, height: 60 }}
              />
          </Grid>
          <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
          }}
      >
          <MenuItem onClick={() => { handleClose(); alert('Cambiar contraseña'); }}>
              Cambiar Contraseña
          </MenuItem>
          <MenuItem onClick={() => {handleSingOut()}}>
              Cerrar Sesión
          </MenuItem>
      </Menu>
    </>
    );
};

export default UserHeaderCard;