import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Alert from '../components/Alert.jsx'

function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState({email: '', password: ''});
    const [error, setError] = useState(false);

    const handlerSubmit = (e) => {
        e.preventDefault();

        if(user.email === 'admin@gmail.com' && user.password === 'admin') {
            console.log('OK');
            navigate('/tasks');
        } else {
            console.log('Credenciales incorrectas');
            setError(true);
        }
    }

    const handlerChange = (e) => {
        setError(false);
        const {name, value} = e.target;
        setUser({...user, [name]: value})
    }

    return (

    <main className='container'>

        {error && <Alert mensaje='Credenciales incorrectas' />}

        <form onSubmit={handlerSubmit} className='form-user'>
            <div className="form-header">
                <h2>Login</h2>
            </div>
            <label htmlFor='inputEmail'>Email</label>
            <input value={user.email} onChange={handlerChange} required name='email' id="inputEmail" type="text" />

            <label htmlFor='inputPassword'>Contraseña</label>
            <input required value={user.password} onChange={handlerChange} name='password' id="inputPassword" type="password" />

            <button type="submit">Ingresar</button>

            <Link to='/register'>¿No tenes una cuenta? Registrate aquí</Link>
        </form>

    </main>
    )
}

export default Login;