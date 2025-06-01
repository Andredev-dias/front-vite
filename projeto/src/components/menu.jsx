import { useNavigate } from "react-router"
import MenuImg from '../assets/menu.png'
import styles from './menu.module.css'
import { useState } from "react"

export const Menu = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const goToDashboard = () => navigate(`/dashboard`)
    const goToUsers = () => navigate(`/usersList`)
    const goToCreateUser = () => navigate(`/usersCreate`)
    const goToProducts = () => navigate(`/productsList`)
    const goToCreateProducts = () => navigate(`/productsCreate`)
    const logout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    console.log(open)
    return(
        <nav className={open ? styles.navBar : styles.navBarClosed}>
          <img src={MenuImg} alt="Menu" onClick={() => setOpen(prev => !prev)} />
            <p onClick={goToDashboard}>{open && 'Dashboard'}</p>
            <p onClick={goToCreateUser}>{open && 'Criar Usuario'}</p>
            <p onClick={goToUsers}>{open && 'Lista de Usuarios'}</p>
            <p onClick={goToCreateProducts}>{open && 'Criar Produto'}</p>
            <p onClick={goToProducts}>{open && 'Lista de Produtos'}</p>
            <p onClick={logout}>{open && 'Sair'}</p>
        </nav>
    )
}