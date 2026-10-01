// componentes

import Cabecera from './components/Cabecera'
import Pie from './components/Pie'
import Nav from './components/Nav'

// paginas
import Home from './pages/Home'
import Blog from './pages/Blog'
function App() {
  return (
    <>
      <Cabecera />
      <Nav></Nav>
      <Home></Home>
      <Pie />
    </>
  )
}

export default App