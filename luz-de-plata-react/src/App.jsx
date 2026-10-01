// componentes

import Cabecera from './components/Cabecera'
import Pie from './components/Pie'
import Nav from './components/Nav'

// paginas
import Home from './pages/Home'
import Blog from './pages/Blog'

import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
      <Cabecera />
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Blog" element={<Blog />} />
      </Routes>
      <Pie />
    </>
  )
}

export default App