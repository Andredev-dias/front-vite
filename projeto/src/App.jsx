
import { useEffect, useState } from 'react'
import { api } from './api/api'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [users, setUsers] = useState([])



  useEffect(() => {
    api.get('/').then((res) => {
      setData(res.data)
    })
  }, [])

  useEffect(() => {
    api.get('/funcionarios').then((res) => {
      setData2(res.data.items)
    })
  }, [])

  useEffect(() => {
    api.get('/users').then((res) => {
      setUsers(res.data)
    })
  }, [])


  return (
    <>
      {data}
      <br /><br /><br />
      {data2.map((item) => {
        return (
          <div key={item.id}>
            <h3>{item.nome}</h3>
            <p>{item.cargo}</p>
            <p>{item.idade}</p>
            <p>{item.temLicenca ? "Habilitado 😁" : "Sem premissao 🤬"}</p>
          </div>
        )
      })}
      <br /><br /><br />
      {users.map((item) => {
        return (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.email}</p>
          </div>
        )
      })}
    </>
  )
}

export default App
