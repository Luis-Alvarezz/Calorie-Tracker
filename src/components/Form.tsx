import categories from "../data/categories"

export default function Form() {
  return (
    <form action="" className="space-y-5 bg-white shadow-xl p-10 rounded-lg">
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="cursor-pointer">Categoria:</label>
        <select name="category" id="category" className="border border-slate-300 p-2 rounded-lg w-full bg-white">
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="activity" className="cursor-pointer">Actividad:</label>
        <input id="activity" type="text" className="border border-slate-300 p-2 rounded-lg" placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Pesas, Bicicleta" />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="cursor-pointer">Calorias:</label>
        <input id="calories" type="number" min={0} className="border border-slate-300 p-2 rounded-lg" placeholder="Calorias. ej. 300 0 500" />
      </div>

      <input type="submit" className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer" value='Guardar Comida o Guardar Ejercicio'/>
    </form>
  )
}
