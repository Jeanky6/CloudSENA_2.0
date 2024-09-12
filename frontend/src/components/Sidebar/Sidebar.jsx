import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Asegúrate de importar tu archivo de estilos


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Initial state: sidebar closed

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'scroll initial' }}>
      <CDBSidebar toggled="true" textColor="#000000" backgroundColor="#ffffff" className='custom-sidebar' visible={isOpen}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" style={{ color: '#39A900' }} onClick={toggleSidebar}></i>}>
          <a className="text-decoration-none" style={{ color: '#000000' }}>
            Menú
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/crear" activeClassName="activeClicked" >
              <CDBSidebarMenuItem icon="fa-solid fa-plus" style={{ color: '#39A900' }} className="listItem ">
                <span style={{ color: '#000000' }}>Crear Proyectos</span>
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/fichas" activeClassName="activeClicked" >
              <CDBSidebarMenuItem icon="table" style={{ color: '#39A900' }} className="listItem">
                <span style={{ color: '#000000' }}>Fichas</span>
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/users" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user" style={{ color: '#39A900' }} className="listItem">
                <span style={{ color: '#000000' }}>Usuarios</span>
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/gestor" activeClassName="activeClicked" >
              <CDBSidebarMenuItem icon="users" style={{ color: '#39A900' }} className="listItem">
                <span style={{ color: '#000000' }}>Gestores</span>
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center', color: '#39A900' }}>
          <div style={{ padding: '20px 5px' }}>
            Cloud Sena
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>

    </div>
  );
};

export default Sidebar;
