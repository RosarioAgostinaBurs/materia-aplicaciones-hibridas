import Title from './Title.jsx'

function Header({titulo}) {

    return (
        <header>
            <Title titulo={titulo}></Title>
        </header>
    )
}

export default Header;