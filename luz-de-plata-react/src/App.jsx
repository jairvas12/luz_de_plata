// componentes

import Cabecera from './components/Cabecera'
import Pie from './components/Pie'
import Nav from './components/Nav'

// paginas
import Home from './pages/Home'
import Blog from './pages/Blog'
import Blog1 from './pages/Blog1'
import Blog2 from './pages/Blog2'
import Envios from './pages/Envios'
import Compra_Exitosa from './pages/Compra_Exitosa'
import MasVendidos from './pages/MasVendidos'

import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
      <Cabecera />
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Blog1" element={<Blog1 />} />
        <Route path="/Blog2" element={<Blog2 />} />
        <Route path="/Envios" element={<Envios />} />
        <Route path="/Compra_Exitosa" element={<Compra_Exitosa />} />
        <Route path="/MasVendidos" element={<MasVendidos />} />
      </Routes>
      <Pie />
    </>
  )
}

export default App