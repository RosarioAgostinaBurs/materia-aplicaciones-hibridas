import { useState, useEffect } from 'react'
import TasksContainer from '../components/TasksContainer.jsx'
import Task from '../components/Task.jsx'
import FormTask from '../components/FormTask.jsx';

function Home() {

    const [tasks, setTasks] = useState([]);

    const endPoint = "http://localhost:5000/api/tasks";

    useEffect(() => {
        fetch(endPoint)
        .then((res) => res.json())
        .then((json) => {
            const { data } = json;
            setTasks(data);
            console.log("Tareas cargadas desde el backend:", data);
        })
        .catch((error) => {
            console.error("Error al obtener las tareas:", error);
            alert("No se pudo conectar con el servidor");
        });
    }, []);

    const postTask = async (task) => {
        const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
        };

        const resp = await fetch(endPoint, options);
        if (resp.ok) {
        const data = await resp.json();
        return data.data;
        } else {
        throw new Error("Error al agregar la tarea");
        }
    };


    const agregarTarea = async (msg) => {
        console.log({msg});
        const descripcion = msg;
        try {
            const nuevaTarea = { descripcion };

            const { _id, fecha } = await postTask(nuevaTarea);

            const nueva = { _id, descripcion, fecha };
            setTasks([...tasks, nueva]);

            console.log("Tarea agregada correctamente:", nueva);
            } catch (error) {
            console.error(error);
            alert("Hubo un error al agregar la tarea");
            }
    }


    return (
        <>
            <main className='container'>
                <FormTask onAdd={agregarTarea}/>

                {/*<form onSubmit={manejadorSubmit}>
                <input
                    type='text'
                    value={descripcion}
                    placeholder='Ingresar nueva tarea'
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                />
                <button type='submit'>Agregar</button>
                </form>*/}

                <TasksContainer>
                {tasks.map((task) => (
                    <Task
                    key={task._id}
                    descripcion={task.descripcion}
                    fecha={task.fecha}
                    />
                ))}
                </TasksContainer>
            </main>
        </>
    )
}

export default Home;

