function Task({_id, descripcion, fecha}) {
    return(
        <li className="tarea">
            <button className="change">✅</button>
            <div className="descripcion">
                <p className="nombre">{descripcion}</p>
                <p className="timestamp">{fecha}</p>
            </div>
        </li>
    )
}

export default Task;