import { useNavigate } from "react-router"
import { useEffect } from "react"
import { Menu } from "./components/menu"

function Dashboard(){
const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) navigate('/')
  }, [navigate])

    return(
        <>
        <Menu/>
        <div>
            <div>
                <p onClick={() => navigate('/productsCreate')}>Criar produto</p>
                <p onClick={() => navigate('/productsList')}>Lista de produtos</p>
            </div>
            <div>
                <p onClick={() => navigate('/usersCreate')}>Criar usuario</p>
                <p onClick={() => navigate('/usersList')}>Lista de usuarios</p>
            </div>
        </div>
        </>
    )
}

export default Dashboard