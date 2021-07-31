import React, { useContext } from "react";
import tareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";
const Tarea = ({ tarea }) => {
  const proyectosContext = useContext(proyectoContext);
  const tareasContext = useContext(tareaContext);

  const { proyecto } = proyectosContext;
  const [proyectoActual] = proyecto;

  // jalo el eliminarTarea del context
  const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } =
    tareasContext;

  // Funcion que se ejecuta cuando el usuario presiona eliminar
  const tareaEliminar = (id) => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual._id);
  };

  // Función que modifica el estado de las tareas
  const cambiaEstado = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    actualizarTarea(tarea /*, proyectoActual._id*/);
  };

  // Agrega una tarea actual cuando el usuario desea editarla
  const seleccionarTarea = (tarea) => {
    guardarTareaActual(tarea);
  };
  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button
            type="button"
            className="completo"
            onClick={() => cambiaEstado(tarea)}>
            Completo
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => cambiaEstado(tarea)}>
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => {
            seleccionarTarea(tarea);
          }}>
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => tareaEliminar(tarea._id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
