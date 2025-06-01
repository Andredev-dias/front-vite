import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { Menu } from "./components/menu"
import { api } from "./api/api"
import styles from './Dashboard.module.css'

function Dashboard() {
  const navigate = useNavigate()
  const [userCount, setUserCount] = useState(0)
  const [productCount, setProductCount] = useState(0)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) navigate('/')
  }, [navigate])

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersRes, productsRes] = await Promise.all([
          api.get('/users'),
          api.get('/list')
        ])
        setUserCount(usersRes.data.length)
        setProductCount(productsRes.data.length)
      } catch (err) {
        console.error("Erro ao buscar dados do dashboard", err)
      }
    }

    fetchData()
  }, [])

  return (
    <section>
      <Menu />
      <div className={styles.wrapNav}>
        <div onClick={() => navigate('/productsCreate')} className={styles.wrapItem}>
          <p>Criar produto</p>
        </div>
        <div onClick={() => navigate('/productsList')} className={styles.wrapItem}>
          <p>Lista de produtos ({productCount} - produtos)</p>
        </div>
        <div onClick={() => navigate('/usersCreate')} className={styles.wrapItem}>
          <p>Criar usuário</p>
        </div>
        <div onClick={() => navigate('/usersList')} className={styles.wrapItem}>
          <p>Lista de usuários ({userCount} - usuarios)</p>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
