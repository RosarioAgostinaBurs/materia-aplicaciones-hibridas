import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Nav from './components/Nav.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {

  const usuario = "Rosario";

  return (
    <>
      <Header>
        <Nav usuario={usuario} />
      </Header>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/tasks' element={<Home/>}/>
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>

      <Footer descripcion="TO DO APP" />
    </>
  )
}

export default App;
