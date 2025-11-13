import {useState} from "react";
import Alert from './Alert.jsx';

const FormTask = ({onAdd}) => {

    const [msgError, setMsgError] = useState('');
    const [error, setError] = useState(false);
    const [descripcion, setDescripcion] = useState('');

    // Esta función es la que se encarga de comunicarse con el padre (home)
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!descripcion.trim()) {
            setMsgError('Completar el campo');
            setError(true);
            return;
        }

        // Acá me comunico con el componente padre
        onAdd(descripcion);

        setDescripcion('');
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={descripcion}
                    placeholder='Ingresar nueva tarea'
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                />
                <button type='submit'>Agregar</button>

                {error && <Alert mensaje={msgError} />}
            </form>
        </>
    )
}

export default FormTask;