function Galeria({imgs}) {
    return (
        <>
            {imgs.map((imgI, index) => (
                <img key={index} src={imgI}></img>
            ))}
        </>
    ) 
}

export default Galeria;