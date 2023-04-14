import { formatearFecha, formatearPresupuesto } from "../helpers";

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import IconoAhorro from '../img/icono_ahorro.svg';
import IconoComida from '../img/icono_comida.svg';
import IconoGastos from '../img/icono_gastos.svg';
import IconoOcio from '../img/icono_ocio.svg';
import IconoSalud from '../img/icono_salud.svg';
import IconoSuscripciones from '../img/icono_suscripciones.svg';

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {

    const {nombre, cantidad, categoria, id, fecha} = gasto

    const diccionarioIconos = {
        ahorro: IconoAhorro,
        comida: IconoComida,
        gastos: IconoGastos,
        plan: IconoSuscripciones,
        spotify: IconoOcio,
        netflix: IconoSalud,
    };

    const leadingActions = () => (

        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>

    );

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => eliminarGasto(id)}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );



    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img src={diccionarioIconos[categoria]} alt="icnono correspondiente" />
                        <div className="descripcion-gasto">
                            <p className="nombre-gasto">{nombre}</p>
                            <p className="categoria">{categoria}</p>
                            <p className="fecha-gasto">{formatearFecha(fecha)}</p>
                        </div>
                    </div>
                    <p className="cantidad-gasto">{formatearPresupuesto(cantidad)}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Gasto