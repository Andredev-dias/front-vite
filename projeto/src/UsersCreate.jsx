import { useState } from 'react'
import { useNavigate } from 'react-router'
import { api } from './api/api'

function UsersCreate() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/users', user)
      setSuccess('Usuário criado com sucesso!')
      setTimeout(() => navigate('/usersList'), 1000)
    } catch (err) {
      setError('Erro ao criar usuário')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Criar novo usuário</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={user.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Criar Usuário</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  )
}

export default UsersCreate
