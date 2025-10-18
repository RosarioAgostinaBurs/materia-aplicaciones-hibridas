import { useState } from "react";

function Card({id, nombre, descripcion, addToCart}) {

    // Para estados vamos a usar la funcion useState con un valor inicial, esta función retorna un array,
    // por eso la desestructurizamos usando siempre los valores
    // 'state' que es el estado y 'fnSet' que es la función para cambiar ese estado
    const [texto, setTexto] = useState(descripcion);

    function convertir() {
        setTexto(texto.toUpperCase());
    }

    function addToCartHijo() {
        console.log('Agregando al carrito');
        addToCart({id, nombre});
    }

    return (
        <div className="card">
            <h4>{nombre}</h4>
            <strong>{texto}</strong>
            <button onClick={() => convertir()} type="button">Ver</button>
            <button className="btn-agregar" onClick={() => addToCartHijo()} type="button">🛒</button>
        </div>
    )
}

export default Card;