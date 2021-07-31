import {
  AGREGAR_TAREA,
  TAREAS_PROYECTO,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_tAREA,
  LIMPIAR_TAREA,
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasproyecto: action.payload,
      };
    case AGREGAR_TAREA:
      return {
        ...state,
        tareasproyecto: [action.payload, ...state.tareasproyecto],
        errortarea: false,
      };
    case VALIDAR_TAREA:
      return {
        ...state,
        errortarea: true,
      };

    case ELIMINAR_TAREA:
      return {
        ...state,
        // retorna todas las tareas que sean diferente al id
        tareasproyecto: state.tareasproyecto.filter(
          (tarea) => tarea._id !== action.payload
        ),
      };
    // como en ambos es lo mismo
    case ACTUALIZAR_tAREA:
      return {
        ...state,
        // itera por todas las tareas hasta que encuentra la tarea
        // y la reemplaza, retornando un nuevo array de tareas
        tareasproyecto: state.tareasproyecto.map((tarea) =>
          tarea._id === action.payload._id ? action.payload : tarea
        ),
        //tareaseleccionada: null,
      };
    case TAREA_ACTUAL:
      return {
        ...state,
        tareaseleccionada: action.payload,
      };

    case LIMPIAR_TAREA:
      return { ...state, tareaseleccionada: null };

    default:
      return state;
  }
};
