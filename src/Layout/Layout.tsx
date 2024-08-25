import React from 'react';
import SideBar from '../components/SideBar';

interface LayoutProps {
  children: React.ReactNode;
  userRole: string; // El rol del usuario se pasa como prop
}

const Layout: React.FC<LayoutProps> = ({ children, userRole }) => {
  return (
    <SideBar userRole={userRole}>
      {children}
    </SideBar>
  );
};

export default Layout;