import { useState } from "react";

function Nav({usuario}) {

    const [logueado, setLogeado] = useState(false);

    const logout = () => {
        const salir = confirm('¿Seguro que desea salir?');
        if(salir) {
            setLogeado(false)
        }
    }

    const login = () => {
        setLogeado(true)
    }

    return (
        <nav>
            <h1>TO DO App</h1>
            <div className="user-info">
                {
                    logueado ? (
                        <>
                            <p>{usuario}</p>
                            <div className="user-image"></div>
                            <button onClick={logout}>Cerrar sesión</button>
                        </>
                    ) : (
                        <>
                            <p>Loguearse</p>
                            <button onClick={login}>Iniciar sesión</button>
                        </>
                    )
                }
            </div>
        </nav>
    )
}

export default Nav;