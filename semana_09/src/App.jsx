import reactLogo from './assets/react.svg'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Card from './components/Card.jsx'
import Container from './components/Container.jsx'

function App() {

  const redes = [
    {id: 1, nombre: 'Instagram', url: 'http://instagram.com'},
    {id: 2, nombre: 'GitHub', url: 'http://github.com'}
  ]

    const cursos = [
    { id: 1, nombre: 'JavaScript', descripcion: 'Programación Imperativa'},
    { id: 2, nombre: 'MySQL', descripcion: 'Consultas y SP'},
    { id: 3, nombre: 'PHP', descripcion: 'Conexión con Base de Datos'},
    { id: 4, nombre: 'CSS', descripcion: 'Layout con Flexbox'},
  ]

  return (

    <>
      <Header titulo="Cursos"></Header>

      <main>
        <Container>
          {cursos.map(curso => <Card key={curso.id} nombre={curso.nombre} descripcion={curso.descripcion}></Card>)}
        </Container>
      </main>

      <Footer 
        descripcion="Aplicaciones Híbirdas"
        redes={redes}
      >
      </Footer>
    </>
  )
}

export default App
