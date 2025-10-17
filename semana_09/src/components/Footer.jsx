function Footer({descripcion, redes}) {

    const year = new Date().getFullYear();

    return (
        <footer>
            <p>DV | {descripcion} | {year}</p>
            <ul>
                {redes.map(red => <li key={red.id}>{red.nombre}</li>)}
            </ul>
        </footer>
    )
}

export default Footer;