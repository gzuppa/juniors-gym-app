import React, { useState } from 'react'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import PeopleIcon from '@mui/icons-material/People'
import { NavLink } from 'react-router-dom'
import JuniorsLogo from '../assets/images/logo-transparent.png'
import useAuth from '../hooks/useAuth'
import '../styles/Sidebar.css'

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { auth } = useAuth()
  const toggle = () => setIsOpen(!isOpen)
  const menuItem = [
    {
      path: 'members',
      name: 'Usuarios',
      icon: <PeopleIcon />,
    },
    {
      path: 'create-member',
      name: 'Agregar nuevo usuario',
      icon: <GroupAddOutlinedIcon />,
    },
    {
      path: '',
      name: 'Panel inicial',
      icon: <AdminPanelSettingsIcon />,
    },
    {
      path: '',
      name: 'Cerrar sesión',
      icon: <CancelPresentationIcon />,
    },
  ]
  return (
    <div>
      <div
        style={{ width: isOpen ? '200px' : '50px' }}
        className="sidebar font-raleway"
      >
        <div className="top_section text-yellow-300">
          <a href="/">
            <img
              style={{ display: isOpen ? 'block' : 'none' }}
              src={JuniorsLogo}
              alt="JuniorsLogo"
              className="h-20 mr-5"
            />
          </a>

          <div style={{ marginLeft: isOpen ? '50px' : '0px' }} className="bars">
            <MenuOpenIcon onClick={toggle} />
          </div>
        </div>
        <div style={{ display: isOpen ? 'block' : 'none' }}>
          <p className="text-yellow-300 ml-4 mb-3 font-bold">
            Hola {auth.name}
          </p>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link text-yellow-300 hover:text-purple-800"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? 'block' : 'none' }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  )
}

export default Sidebar
