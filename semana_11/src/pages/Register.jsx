import {useState} from 'react'
import Alert from '../components/Alert.jsx'
import {Link} from 'react-router-dom'

function Register() {

    const endPoint = "http://localhost:5000/api/tasks";

    const [user, setUser] = useState({nombre: '', email: '', password: '', passwordtwo: ''});

    const handlerChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
        setError(false);
    }

    const [error, setError] = useState(false);
    const [msgError, setMsgError] = useState('');

    const validar = () => {
        if(!user.nombre.trim()) return 'El nombre es obligatorio';
        if(!user.email.trim()) return 'El email es obligatorio';
        if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(user.email)) return 'El formato del email es incorrecto';
        if(user.password < 4) return 'La contraseña debe tener al menos 5 caracteres';
        if(user.password !== user.passwordtwo) return 'Las contraseñas no coinciden';

        return null;
    }

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const error = validar();
        if(error) {
            setMsgError(error);
            setError(true);
        }
    }

    return (
        
        <main className='container'>

            <form onSubmit={handlerSubmit} className='form-user'>
                <div className="form-header"><h2>Register</h2></div>

                {error && <Alert mensaje={msgError} />}

                <label htmlFor='inputNombre'>Nombre</label>
                <input value={user.nombre} onChange={handlerChange} id="inputNombre" name='nombre' type="text" />

                <label htmlFor='inputEmail'>Email</label>
                <input value={user.email} onChange={handlerChange} id="inputEmail" name='email' type="text" />

                <label htmlFor='inputPassword'>Contraseña</label>
                <input value={user.password} onChange={handlerChange} id="inputPassword" name='password' type="password" />

                <label htmlFor='inputPasswordRepetida'>Repetir contraseña</label>
                <input value={user.passwordtwo} onChange={handlerChange} id="inputPasswordRepetida" name='passwordtwo' type="password" />

                <button type="submit">Crear Cuenta</button>

                <Link to='/'>¿Ya tenes una cuenta? Ingresa aquí</Link>
            </form>

        </main>
    )
}

export default Register;