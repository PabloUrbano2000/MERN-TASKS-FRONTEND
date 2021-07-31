import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  // Obtener el state del proyectos y tareas
  const proyectosContext = useContext(proyectoContext);
  const tareasContext = useContext(tareaContext);

  // funcion que recibo del context para enviarle el id del proyecto
  const { proyectoActual } = proyectosContext;

  // recibo el obtenertareas de su context
  const { obtenerTareas } = tareasContext;

  // Función para agregar el proyecto actual
  const seleccionarProyecto = (id) => {
    proyectoActual(id); // Fijar un proyecto actual
    obtenerTareas(id); // Filtrar las tareas cuando se de click
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}>
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
