import { useState } from 'react'
import { useNavigate } from 'react-router'
import { api } from './api/api'

function ProductsCreate() {
  const navigate = useNavigate()
  const [product, setProduct] = useState({
    description: '',
    price: '',
    quantity: '',
    image: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const body = {
        ...product,
        price: parseFloat(product.price),
        quantity: parseInt(product.quantity)
      }
      await api.post('/list', body)
      setSuccess('Produto criado com sucesso!')
      setTimeout(() => navigate('/productsList'), 1000) // redireciona depois de 1s
    } catch (err) {
      setError('Erro ao criar produto')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Criar novo produto</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <input
          type="text"
          name="description"
          placeholder="Descrição"
          value={product.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Preço"
          value={product.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantidade"
          value={product.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL da imagem"
          value={product.image}
          onChange={handleChange}
          required
        />
        <button type="submit">Criar Produto</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  )
}

export default ProductsCreate
