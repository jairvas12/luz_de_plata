import Cabecera from './components/Cabecera'
import Hero from './components/Hero'
import Menu from './components/Menu'
import ProductosDestacados from './components/ProductosDestacados'
import Beneficios from './components/Beneficios'
import Pie from './components/Pie'

function App() {
  return (
    <>
      <Cabecera />
      <Menu />
      <main> 
        <Hero />
        <ProductosDestacados />
        <Beneficios />
      </main>
      <Pie />
    </>
  )
}

export default App