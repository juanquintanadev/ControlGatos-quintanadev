import { useState, useEffect } from 'react'

import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import Filtros from './components/Filtros';

import {generarId} from './helpers';

import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { object } from 'prop-types';


function App() {

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );
  const [gastoEditar, setGastoEditar] = useState({});

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [validPres, setValidPres] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false);

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true)
    }, 500);
    };
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

  useEffect(() => {
    if(filtro) {
      const nuevoFiltro = gastos.filter(gasto => gasto.categoria === filtro);
      setGastosFiltrados(nuevoFiltro);
    }
    
  }, [filtro]);

  useEffect(() => {
    const presupuestoStorage = Number(localStorage.getItem('presupuesto')) ?? 0;
    if(presupuestoStorage > 0) {
      setValidPres(true);
    };
  }, []);

  const handleNuevoGasto = () => {
    setModal(true);

    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true)
  }, 500);
  };

  const guardarGasto = gasto => {
    if(gasto.id) {
      // actualizar, si el gasto del state tiene el mismo id que el gasto que le pasamos existente entonces reemplazamos el elemento sino queda el elemento existente
      const gastosActualizado = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizado);
      setGastoEditar({});
    } else {
      // nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    };
    // console.log(gastos);
    
    setAnimarModal(false);
    setTimeout(() => {
        setModal(false);
    }, 500);
  };

  const eliminarGasto = id => {
    const arregloNuevo = gastos.filter( gasto => gasto.id !== id);
    setGastos(arregloNuevo);
  };

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        validPres={validPres}
        setValidPres={setValidPres}
      />
      {validPres && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              setGastoEditar={setGastoEditar}
              gastos={gastos}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto} alt="icono nuevo gasto" onClick={handleNuevoGasto} />
          </div>
        </>
      )}
      {modal &&
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      }
    </div>
  )
}

export default App
