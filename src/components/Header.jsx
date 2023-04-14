import NuevoPresupuesto from "./NuevoPresupuesto"
import Gastos from "./Gastos"

const Header = ({
  gastos,
  setGastos,
  presupuesto, 
  setPresupuesto,
  validPres,
  setValidPres,
} ) => {


  return (
    <header>
        <h1>Planificador de Gastos</h1>
        {validPres ? (
          <Gastos
            gastos={gastos}
            setGastos={setGastos}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setValidPres={setValidPres}
          />
        ) :
        (<NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setValidPres={setValidPres}
        />)}
        
    </header>
  )
}

export default Header