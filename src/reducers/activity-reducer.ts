// * El reducer consta de varias parts (como vimos anteriormente). Tenemos ACCIONES dichas acciones describen qué es lo que está pasando en nuestra aplicación, despues el StateInicial y nuestro reducer
// * Ahí nuestro reducer conecta tanto nuestro  StateInicial como las **acciones
import type { Activity } from "../types/types"

export type ActivityAction = 
{ // * 1.- Describe que es lo que sucede una vez queremos modificar el STATE
  type: 'save-activity', // ? Describe que es lo que está sucediendo.
  payload: { newActivity: Activity } // ? Datos que se van a agregar al STATE, siendo estructura de un OBJETO de actividad Individual, necesario para el cambio
} |
{
  type: 'set-activeId', // ? Describe que es lo que está sucediendo.
  payload: { id: Activity['id']  } // ? Pasamos unicamente el ID para settear el evento en el formulario
} |

{
  type: 'delete-activity',
  payload: { id: Activity['id'] }
}

export type ActivityState = { // * 3.- Type de estado inicial, el cual se llama 'activities' y el del TYPE 'Activity[]'
  activities: Activity[]; // ? Un array de objetos Activity de manera Global
  activeId: Activity['id'] // ? Vamos a almacenar el ID de la actividad de la cual se presiona para editar
}

const localStorageActivities = () : Activity[]=> {
  const activites = localStorage.getItem('activities') // * obtenemos la variable 'key'
  return activites ? JSON.parse(activites) : [] // * si tenemos activities, los parseamos a un array de objetos Activity, sino, devolvemos un array vacio
}

export const initialState : ActivityState = { // * 2.- STATE INICIAL (valor con el que el estado comienza la primera vez)
  // activities: [],
  activities: localStorageActivities() || [],
  activeId: '' // * Vamos a almacenar el ID de la actividad de la cual se presiona para editar
}


// * 4.- REDUCER                      ESTADO INICIAL               , accion enviada por el dispatch
export const activityReducer = (state: ActivityState = initialState, action: ActivityAction) => {
  // * ? Forma de hacer el reducer (switch), pero tambien:
  if (action.type === 'save-activity') {
    // ? Este codigo, maneja la logica para actualizar el STATE
    // console.log('Desde el type de save-activity')
    // console.log(action.payload.newActivity) // ? Imprimimos la actividad que viene de la accion
    // * LOGICA para evitar registros duplicados y todo lo necesario

    let updatedActivities : Activity[] = []
    if (state.activeId) {
      updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity]
    }

    // * Retorna el STATE ACTUALIZADO
    return {
      ...state, // ? A pesar de ser 1 sola actividad (activities), NO queremos perder la referencia al tener mas de 1 estado
      activities: updatedActivities,
      activeId: ''
    }
  }

  if (action.type === 'set-activeId') {
    return {
      ...state,
      activeId: action.payload.id
    }
  }

  if (action.type === 'delete-activity') {
    return {
      ...state,
      activities: state.activities.filter(activity => activity.id !== action.payload.id),
      activeId: ''
    }
  }
  return state; // * Devolvemos el NUEVO ESTADO, NOOO mutar el estado actual
}