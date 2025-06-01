import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import Dashboard from './Dashboard.jsx'
import UsersList from './UsersList.jsx'
import ProductsList from './ProductsList.jsx'
import ProductsCreate from './ProductsCreate.jsx'
import UsersCreate from './usersCreate.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usersList" element={<UsersList />} />
        <Route path="/usersCreate" element={<UsersCreate />} />
        <Route path="/productsList" element={<ProductsList />} />
        <Route path="/productsCreate" element={<ProductsCreate />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
