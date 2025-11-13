function TasksContainer({children}) {
    return (
        <ul className='tareas-pendientes'>
            {children}
        </ul>
    )
}

export default TasksContainer;