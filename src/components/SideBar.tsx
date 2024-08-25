import { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { LuSchool } from "react-icons/lu";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoSchoolOutline } from "react-icons/io5";
import UserHeaderCard from './UserHeaderCard.tsx';
import { useAuth } from '../auth/AuthProvider.tsx';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    backgroundColor: 'red',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': {
        ...openedMixin(theme),
        backgroundColor: 'red',
      },
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': {
        ...closedMixin(theme),
        backgroundColor: 'red',
      },
    }),
  }),
);

const HoverableDrawer = styled(Drawer)(({ theme }) => ({
  '&:hover': {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': {
      ...openedMixin(theme),
    },
  },
}));

interface SideBarProps {
  children: React.ReactNode;
}

export default function SideBar({ children }: SideBarProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const auth = useAuth();
  const user = auth.getUser();
  const navigate = useNavigate(); // Crear instancia de useNavigate

  const getRole = () => {
    if (!user) return '';
    if (user.is_admin) return 'Admin';
    if (user.is_director) return 'Director';
    if (user.is_profesor) return 'Docente';
    else{
      return '';
    }
  }

  const role = getRole();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <MdOutlineSpaceDashboard size={25}/>, roles: ['Admin', 'Director', 'Docente'], route: role === 'Admin' ? '/admin-dashboard': '/director-dashboard' },
    { text: 'Vista Facultad', icon: <LuSchool size={25}/>, roles: ['Admin'], route: '/faculty-view' },
    { text: 'Vista Escuela', icon: <IoSchoolOutline size={25}/>, roles: ['Admin', 'Director'], route: '/school-view' },
    { text: 'Vista Docente', icon: <FaChalkboardTeacher size={25}/>, roles: ['Admin', 'Director', 'Docente'], route: '/teacher-view' },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(role));

  const handleNavigation = (route: string) => {
    navigate(route); // Redirigir a la ruta especificada
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" elevation={3} sx={{ bgcolor: "White", color: "#8f8f8f" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => { setOpen(!open) }}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Grid container
            direction="row"
            justifyContent="space-between"
            alignItems="center" sx={{ pl: '30px' }}>
            <img src='./headerUnivalle.png' height={50} />
            <UserHeaderCard />
          </Grid>
        </Toolbar>
      </AppBar>
      <HoverableDrawer
        variant="permanent"
        open={open}
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {filteredMenuItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => handleNavigation(item.route)} // Navegar cuando se hace clic
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0, color: 'white' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </HoverableDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography sx={{pt:"60px", color:'#8f8f8f', fontSize:22}}>Sistema de análisis de evaluaciones docente</Typography>
        {children}
      </Box>
    </Box>
  );
}


