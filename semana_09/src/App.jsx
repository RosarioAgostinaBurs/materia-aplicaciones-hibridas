import reactLogo from './assets/react.svg'
import vueLogo from './assets/vue.png'
import phpLogo from './assets/php.png'
import angularLogo from './assets/angular.webp'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Card from './components/Card.jsx'
import Container from './components/Container.jsx'
import Logo from './components/Logo.jsx'
import Galeria from './components/Galeria.jsx'

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

  const imgs = [reactLogo, vueLogo, angularLogo, phpLogo];

  return (

    <>
      <Logo imgURL={reactLogo}></Logo>
      <Header titulo="Cursos"></Header>

      <main>
        <Container>
          {cursos.map(curso => <Card key={curso.id} nombre={curso.nombre} descripcion={curso.descripcion}></Card>)}
        </Container>

        <h2>Galería</h2>
        <div className='galeria'>
          <Galeria imgs={imgs}></Galeria>
        </div>
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
