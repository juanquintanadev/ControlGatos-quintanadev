

const Filtros = ({filtro, setFiltro}) => {
  return (
    <div className="sombra contenedor filtros">
        <form
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
        >
            <div className="campo">
                <label htmlFor="">Busqueda</label>
                <select name="" id="">
                    <option value="">--Todos los gastos--</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="plan">Plan Auto 0km</option>
                    <option value="spotify">Spotify</option>
                    <option value="netflix">Netflix</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filtros