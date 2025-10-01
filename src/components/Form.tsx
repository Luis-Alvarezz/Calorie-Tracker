import { useState } from "react"
import categories from "../data/categories"
import type { Activity } from "../types/types"

export default function Form() {
  // const [category, setCategory] = useState('');
  // const [activity, setActivity] = useState('');
  // const [calories, setCalories] = useState(0); // * Todos se relaciona, podemos crear un objeto:
  const [activity, setActivity] = useState<Activity>({ // * Asignamos TYPE via GENERIC
    category: 1,
    activityName: '',
    calories: 0
  })
  
  //  ! Metodo 1. Actualizar el STATE segun el INPUT que se este escribiendo
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    // console.log('Algo Cambio');
    const isNumberField = ['category', 'calories'].includes(e.target.id); // * SI escribo en categoria o caloria, regresa TRUE
    // console.log(isNumberField);

    setActivity({
      ...activity, // * NO perder referencia del STATE al colocar valores en SELECT o INPUT
      [e.target.id]: isNumberField ? +e.target.value : e.target.value // * con + CONVERTIMOS A NUMERO
    })
    // console.log(e.target.id); // * Identificar en que input estamos escribiendo | OUTPUT: Category o activityName o calories
    // console.log(e.target.value); // * Obtener el valor que esta escribiendo el usuario | OUTPUT: 1 o | OUTPUT: 2
  }

  // ! Metodo 2. Validar el formulario
  const isValidActivity = () => {
    const { activityName, calories} = activity;
    // console.log(activityName.trim() !== '' && calories > 0);
    return activityName.trim() !== '' && calories > 0; // * trim -> Eliminar espacios en blanco al inicio y al final
  }

  return (
    <form action="" className="space-y-5 bg-white shadow-xl p-10 rounded-lg">
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="cursor-pointer">Categoria:</label>
        <select 
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          name="category"
          id="category"
          value={activity.category}
          onChange={handleChange} // * Para sioncronizar cambios dinamicos del STATE y el SELECT
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="activityName" className="cursor-pointer">Actividad:</label>
        <input 
          className="border border-slate-300 p-2 rounded-lg" 
          id="activityName" 
          type="text" 
          placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Pesas, Bicicleta"
          value={activity.activityName} // ! Para settear el valor del INPUT en el STATE
          onChange={handleChange} // ! Para sioncronizar cambios dinamicos del STATE y el SELECT | Equiv al addEventListener('change') en Js
         />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="cursor-pointer">Calorias:</label>
        <input 
          className="border border-slate-300 p-2 rounded-lg"
          id="calories" 
          type="number" 
          min={0} 
          placeholder="Calorias. ej. 300 0 500"
          value={activity.calories}
          onChange={handleChange} // * Para sioncronizar cambios dinamicos del STATE y el SELECT
        />
      </div>

      <input 
        type="submit" 
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10" 
        value='Guardar Comida o Guardar Ejercicio'
        disabled={!isValidActivity()}
      />
    </form>
  )
}
