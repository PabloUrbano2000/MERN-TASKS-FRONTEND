import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  const proyectosContext = useContext(proyectoContext);
  const tareasContext = useContext(tareaContext);
  // funcion que recibo del context para enviarle el id del proyecto
  const { proyecto } = proyectosContext;

  // jalo el agregarTarea del context
  const {
    tareaseleccionada,
    errortarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea,
  } = tareasContext;

  // Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaseleccionada]);

  // State del formulario
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  // extraer el nombre del proyecto
  const { nombre } = tarea;

  if (!proyecto) return null;

  // Array destructuring para extraer elpryecto actual xq viene como arreglo
  const [proyectoActual] = proyecto;

  // Leer los valores del formulario
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitTarea = (e) => {
    e.preventDefault();

    // validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    // Si es edición o si es nueva tarea
    if (tareaseleccionada === null) {
      //tarea nueva
      // agregar la nueva tarea al state
      tarea.proyecto = proyectoActual._id;
      // tarea.estado = false;
      agregarTarea(tarea);
    } else {
      // actualizar la tarea existente
      actualizarTarea(tarea);

      // Elimina tareaseleccionada del state
      limpiarTarea();
    }

    // obtenemos denuevo las tareas
    obtenerTareas(proyectoActual._id);

    // reiniciar el form
    guardarTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmitTarea}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            onChange={handleChange}
            value={nombre}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
