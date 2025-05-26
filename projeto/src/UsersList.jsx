
import { useEffect, useState } from 'react'
import { api } from './api/api'

function UsersList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get('/users')
        setUsers(response.data) // espera que o array venha direto na resposta
        console.log(response.data)
      } catch (err) {
        setError('Erro ao carregar usuários')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <p>Carregando usuários...</p>
  if (error) return <p>{error}</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Lista de usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsersList
