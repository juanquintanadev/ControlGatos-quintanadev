import { useEffect, useState } from "react";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { formatearPresupuesto } from "../helpers"

const Gastos = ({
    gastos, 
    setGastos,
    presupuesto,
    setPresupuesto,
    setValidPres,
}) => {

    const [disponible, setDisponible] = useState(presupuesto);
    const [gastado, setGastado] = useState(0);

    const [porcentaje, setPorcentaje] = useState(0);

    useEffect(() => {
        // utilizamos .reduce para devolvernos el total gastado
        const dineroGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - dineroGastado;

        // calculamos el porcentaje gastado
        setTimeout(() => {
            const porcentajeGastado = ((dineroGastado * 100) / presupuesto).toFixed(2);
            setPorcentaje(porcentajeGastado);
        }, 1000);

        setDisponible(totalDisponible);
        setGastado(dineroGastado);
    }, [gastos]);

    const handleReset = () => {
        const confirmar = confirm('¿Desea resetear esta aplicacion?');
        if(confirmar) {
            setGastos([]);
            setPresupuesto(0);
            setValidPres(false);
        };
        
    };

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-colummnas">
            <div>
                <CircularProgressbar 
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={handleReset}
                >Resetear Gastos</button>
                <p>
                    <span>Presupuesto: </span>{formatearPresupuesto(Number(presupuesto))}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span>{formatearPresupuesto(disponible)}
                </p>
                <p>
                    <span>Gastado: </span>{formatearPresupuesto(gastado)}
                </p>
            </div>
        </div>
    )
}

export default Gastos