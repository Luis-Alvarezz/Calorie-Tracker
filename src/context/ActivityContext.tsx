import { createContext, useMemo, useReducer } from "react"
import { activityReducer, initialState, type ActivityAction, type ActivityState } from "../reducers/activity-reducer"
import type { Activity } from "../types/types"
import categories from "../data/categories"

// ! 4. Type del PROVIDER para Children
type ActivityProviderProps = {
  children: React.ReactNode
}


// ! 3.- Indicar el TYPE para unificar context y Provider
type ActivityContextProps = {
  // * Lo que retornamos del objeto del Objeto Global (ActivityContext.Provider)
  // * Aqui se conecta el CONTEXT (la accion de tener el estado global) y PROVIDER (los datos que va a tener el CONTEXT)
  state: ActivityState // * Lo inferimos del const [ state ]
  dispatch: React.Dispatch<ActivityAction> // * Lo inferimos del const [ dispatch ]
  caloriesConsumed: number
  caloriesBurned: number
  caloriesDifference: number
  categoryName: (category: Activity["category"]) => string[]
  isEmpty: boolean
}

// ! 2.- Crear el Context (La accion de tener el STATE GLOBAL)
// eslint-disable-next-line react-refresh/only-export-components
export const ActivityContext = createContext<ActivityContextProps>({} as ActivityContextProps) // * Opcion 1
// export const ActivityContext = createContext<ActivityContextProps>(null!) // * Opcion 2

// ! 1.- Crear el Provider (de donde vienen los datos [vienen del reducer])
export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  // * Lo que se va a compartir en este provider
  const [state, dispatch] = useReducer(activityReducer, initialState) // * Esto lo hacemos aqui para evitar pasar este reducer en cada
  // * componente, lo haremos de manera Global.

  // ! Contadores
  const caloriesConsumed = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [state.activities])
  const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [state.activities])
  const caloriesDifference = useMemo(() => caloriesConsumed - caloriesBurned, [caloriesBurned, caloriesConsumed])

  // 
  // * useMemo para evitar en las vistas tener los parentesis
  // categories.log(category), // * primer () es para useMemo, segundo () para el parametro de category | Activity['category'] -> LOOK UP
  const categoryName = useMemo(() => (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''),
    [state.activities]) // * Dependencia de activities, asi cuando se agregen mas actividades, se va a ejecutar este codigo para agregar esa nueva actividad

  const isEmpty = useMemo(() => state.activities.length === 0, [state.activities])
  // * Usamos useMemo porque asi NO tenemos que mandar a llamar a la funcion, es decir 'isEmpty()' y solamente se ejecuta el codigo cuando cambia 'activies' 



  return (
    <ActivityContext.Provider value={{ // * El value siempre es OBJETO, en esta caso retornamos otro OBJETO
      // * Hacemos disponibles de manera GLOBAL el estado y sus metodos
      state,
      dispatch,
      caloriesConsumed,
      caloriesBurned,
      caloriesDifference,
      categoryName,
      isEmpty
    }}>
      {children}
    </ActivityContext.Provider>
  )
}
