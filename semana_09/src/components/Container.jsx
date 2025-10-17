function Container({children}) {
    return (

        <div>
            <input type="search"></input>
            <select>
                <option value="1">Frontend</option>
                <option value="2">Backend</option>
                <option value="3">Diseño</option>
            </select>
            <hr></hr>
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default Container;