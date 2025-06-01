import { useNavigate } from "react-router"

export const Menu = () => {
    const navigate = useNavigate()

    const goToDashboard = () => navigate(`/dashboard`)
    const goToUsers = () => navigate(`/usersList`)
    const goToCreateUser = () => navigate(`/usersCreate`)
    const goToProducts = () => navigate(`/productsList`)
    const goToCreateProducts = () => navigate(`/productsCreate`)
    const logout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }


    return(
        <nav>
            <p onClick={goToDashboard}>Dashboard</p>
            <p onClick={goToCreateUser}>Criar Usuario</p>
            <p onClick={goToUsers}>Lista de Usuarios</p>
            <p onClick={goToCreateProducts}>Criar Produto</p>
            <p onClick={goToProducts}>Lista de Produtos</p>
            <p onClick={logout}>Sair</p>
        </nav>
    )
}