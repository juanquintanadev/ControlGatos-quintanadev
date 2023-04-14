import { useState, useEffect } from 'react';

import Mensaje from './Mensaje';

import Cerrar from '../img/cerrar.svg'

const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto, 
    gastoEditar,
    setGastoEditar,
}) => {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');

    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha)
        };
    }, []);

    const handleCerrar = () => {
        
        setAnimarModal(false);
        setGastoEditar({});
        setTimeout(() => {
            setModal(false);
        }, 500);
        
    };

    const handleSubmit = e => {
        e.preventDefault();

        if([nombre, cantidad, categoria].includes('')) {
            setMensaje('todos los campos son obligatorios');

            setTimeout(() => {
                setMensaje('');
            }, 3000);

            return;
        };

        guardarGasto({nombre, cantidad, categoria, id, fecha});
    };

    return (
        <div className="modal ">
            <div className='cerrar-modal'>
                <img src={Cerrar} alt="icono de cierre modal" onClick={handleCerrar}/>
            </div>
            <form onSubmit={handleSubmit} action="" className={`${animarModal ? "animar" : "cerrar"} formulario`}>
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                <div className='campo'>
                    <label htmlFor="nombre">Gasto:</label>
                    <input 
                        value={nombre} 
                        onChange={e => setNombre(e.target.value)} 
                        id='nombre' 
                        type="text" 
                        placeholder='Añade tu nuevo gasto'/>
                </div>
                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad del gasto:</label>
                    <input value={cantidad} onChange={e => setCantidad(Number(e.target.value))}  id='cantidad' type="number" placeholder='Ejemplo: $300'/>
                </div>
                <div className='campo'>
                    <label htmlFor="tipo">Tipo del gasto:</label>
                    <select value={categoria} onChange={e => setCategoria(e.target.value)}  name="" id="tipo">
                        <option value="" disabled>--Seleccione un gasto--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="plan">Plan Auto 0km</option>
                        <option value="spotify">Spotify</option>
                        <option value="netflix">Netflix</option>
                    </select>
                </div>
                <input type="submit" value={gastoEditar.nombre ? 'Editar Gasto' : 'Añadir Gasto'}/>
                {mensaje && (
                    <Mensaje tipo="error">{mensaje}</Mensaje>
                )}
            </form>
        </div>
    )
}

export default Modal