// * El reducer consta de varias parts (como vimos anteriormente). Tenemos ACCIONES dichas acciones describen qué es lo que está pasando en nuestra aplicación, despues el StateInicial y nuestro reducer
// * Ahí nuestro reducer conecta tanto nuestro  StateInicial como las **acciones
import type { Activity } from "../types/types"

export type ActivityAction = { // * 1.- Describe que es lo que sucede una vez queremos modificar el STATE
  type: 'save-activity', // ? Describe que es lo que está sucediendo.
  payload: { newActivity: Activity } // ? Datos que se van a agregar al STATE, siendo estructura de un OBJETO de actividad Individual, necesario para el cambio
}

type ActivityState = { // * 3.- Type de estado inicial, el cual se llama 'activities' y el del TYPE 'Activity[]'
  activities: Activity[]; // * Un array de objetos Activity de manera Global
}

export const initialState : ActivityState = { // * 2.- STATE INICIAL (valor con el que el estado comienza la primera vez)
  activities: [],
}

// * 4.- REDUCER                      ESTADO INICIAL               , accion enviada por el dispatch
export const activityReducer = (state: ActivityState = initialState, action: ActivityAction) => {
  // * ? Forma de hacer el reducer (switch), pero tambien:
  if (action.type === 'save-activity') {
    // ? Este codigo, maneja la logica para actualizar el STATE
    // console.log('Desde el type de save-activity')
    // console.log(action.payload.newActivity) // ? Imprimimos la actividad que viene de la accion
    // * LOGICA para evitar registros duplicados y todo lo necesario

    return {
      // * Retorna el STATE ACTUALIZADO
      ...state, // ? A pesar de ser 1 sola actividad (activities), NO queremos perder la referencia al tener mas de 1 estado
      activities: [...state.activities, action.payload.newActivity]
    }
  }
  return state; // * Devolvemos el NUEVO ESTADO, NOOO mutar el estado actual
}