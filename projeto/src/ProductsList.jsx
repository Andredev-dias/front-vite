import { useEffect, useState } from 'react'
import { api } from './api/api'
import { useNavigate } from 'react-router'
import { Menu } from "./components/menu"

function ProductsList() {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editProductId, setEditProductId] = useState(null)
  const [editedProduct, setEditedProduct] = useState({})

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) navigate('/')
  }, [navigate])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/list')
        setProducts(response.data)
      } catch (err) {
        setError('Erro ao carregar produtos')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/list/${id}`)
      setProducts(products.filter((p) => p.id !== id))
    } catch (err) {
      alert('Erro ao deletar produto')
    }
  }

  const handleEditClick = (product) => {
    setEditProductId(product.id)
    setEditedProduct({ ...product })
  }

  const handleSave = async () => {
    try {
      const response = await api.put(`/list/${editProductId}`, editedProduct)
      setProducts(
        products.map((p) => (p.id === editProductId ? response.data : p))
      )
      setEditProductId(null)
    } catch (err) {
      alert('Erro ao atualizar produto')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedProduct({ ...editedProduct, [name]: name === "price" || name === "quantity" ? Number(value) : value })
  }

  if (loading) return <p>Carregando produtos...</p>
  if (error) return <p>{error}</p>

  return (
    <section>
    <Menu/>
    <div style={{ padding: '2rem' }}>
      <h1>Lista de produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} style={{ marginBottom: '1rem' }}>
            {editProductId === product.id ? (
              <>
                <input
                  name="description"
                  value={editedProduct.description}
                  onChange={handleChange}
                  placeholder="Descrição"
                />
                <input
                  name="price"
                  type="number"
                  value={editedProduct.price}
                  onChange={handleChange}
                  placeholder="Preço"
                />
                <input
                  name="quantity"
                  type="number"
                  value={editedProduct.quantity}
                  onChange={handleChange}
                  placeholder="Quantidade"
                />
                <input
                  name="image"
                  value={editedProduct.image}
                  onChange={handleChange}
                  placeholder="URL da Imagem"
                />
                <button onClick={handleSave}>Salvar</button>
                <button onClick={() => setEditProductId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <img width={50} height="auto" src={product.image} alt={product.description} /> - <strong>{product.description}</strong> — ${product.price} - {product.quantity}
                <button onClick={() => handleEditClick(product)} style={{ marginLeft: '1rem' }}>Editar</button>
                <button onClick={() => handleDelete(product.id)} style={{ marginLeft: '0.5rem' }}>Deletar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
    </section>
  )
}

export default ProductsList
