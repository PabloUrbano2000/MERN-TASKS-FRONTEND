import React, { useContext } from "react";
import Tarea from "./Tarea";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoTareas = () => {
  const proyectosContext = useContext(proyectoContext);
  const tareasContext = useContext(tareaContext);

  // funcion que recibo del context para enviarle el id del proyecto
  const { proyecto, eliminarProyecto } = proyectosContext;

  // recibo las tareas del tareasstate
  const { tareasproyecto } = tareasContext;

  // Si no hay proyecto seleccionado
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;

  // Array destructuring para extraer elpryecto actual xq viene como arreglo
  const [proyectoActual] = proyecto;

  // eliminar el proyecto por id
  const onClickEliminar = () => {
    eliminarProyecto(proyectoActual._id);
  };

  return (
    <>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasproyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasproyecto.map((tarea) => (
              <CSSTransition key={tarea._id} classNames="tarea" timeout={200}>
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onClickEliminar}>
        Eliminar Proyecto &times;
      </button>
    </>
  );
};

export default ListadoTareas;
