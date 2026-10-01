// componentes

import Cabecera from './components/Cabecera'
import Pie from './components/Pie'
import Nav from './components/Nav'

// paginas
import Home from './pages/Home'
import Blog from './pages/Blog'
import Blog1 from './pages/Blog1'
import Blog2 from './pages/Blog2'

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
      </Routes>
      <Pie />
    </>
  )
}

export default App