import Form from "./components/Form"
import { useReducer, useEffect, useMemo } from "react";
import ActivityList from "./components/ActivityList";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState); // * De momento NO ocupamos el STATE
  // * Pero como necesitamos el dispatch y se aplica DESTRUCTURING por posiciones
  // console.log(state)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities)) // * Convertimos el array de actividades en una cadena de texto para poder guardarlo en el localStorage
  }, [state.activities]) // * Escuchamos por 'state.activities' para que se dispare cuando se agregue o elimine una actividad

  const canResetApp = useMemo(() => state.activities.length > 0, [state.activities]) // * Pasamos como dependencia 'state.activities' porque si el usuario agrega actividades o interactuamos en este STATE
  // * es cuando queremos permitir al usuario reestablecer o reiniciar la Aplicacion. 

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">Contador de Calorías</h1>

          <button 
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-55 disabled:cursor-not-allowed"
            disabled={!canResetApp}
            onClick={() => dispatch({ type: 'reset-activities' })}
          >
            Reiniciar App
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker 
            activities={state.activities}
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList 
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>

    </>
  )
}

export default App
