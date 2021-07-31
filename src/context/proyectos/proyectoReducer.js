import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR,
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case FORMULARIO_PROYECTO:
      return {
        ...state,
        // el formulario lo vuelvo en true
        formulario: true,
      };

    case OBTENER_PROYECTOS:
      return {
        ...state,
        proyectos: action.payload,
      };
    case AGREGAR_PROYECTO:
      return {
        ...state,
        // envio los proyectos y el proyecto nuevo
        proyectos: [...state.proyectos, action.payload],
        // desabilito el formulario
        formulario: false,
        errorformulario: false,
      };
    case VALIDAR_FORMULARIO:
      return {
        ...state,
        // habilito el error
        errorformulario: true,
      };
    case PROYECTO_ACTUAL:
      return {
        ...state,
        // mostrar proyecto, mediante filtro
        proyecto: state.proyectos.filter(
          (proyecto) => proyecto._id === action.payload
        ),
      };

    case ELIMINAR_PROYECTO:
      return {
        ...state,
        // guardar los proyectos, menos el mandado por id
        proyectos: state.proyectos.filter(
          (proyecto) => proyecto._id !== action.payload
        ),
        // volvemos a ponerlo en nulo para que no se muestre el proyecto eliminado
        proyecto: null,
      };
    case PROYECTO_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };

    default:
      return state;
  }
};
