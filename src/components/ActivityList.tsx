import { useMemo } from "react"
import type { Activity } from "../types/types"
import categories from "../data/categories"
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'
import type { ActivityAction } from "../reducers/activity-reducer"
import { XCircleIcon } from "@heroicons/react/16/solid"

type ActivitiListProps = {
  // * PROP : TYPE
  activities: Activity[],
  dispatch: React.Dispatch<ActivityAction>
}

export default function ActivityList({ activities, dispatch }: ActivitiListProps) {
  // console.log(activities)

  // * useMemo para evitar en las vistas tener los parentesis
  // categories.log(category), // * primer () es para useMemo, segundo () para el parametro de category | Activity['category'] -> LOOK UP
  const categoryName = useMemo(() => (category: Activity['category']) => categories.map( cat => cat.id === category ? cat.name : ''), 
  [activities]) // * Dependencia de activities, asi cuando se agregen mas actividades, se va a ejecutar este codigo para agregar esa nueva actividad
  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>

      {activities.map(activity => ( // * NO creamos componente nuevo para no tener el famoso 'prop drilling' (muchos props)
        <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between">
          {/* // ! Botones para renderizar eventos en DOM */}
          <div className="space-y-2 relative">
            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
              {categoryName(+activity.category)}
            </p>
            {/*  // * Aseguramos que se pase el tipo number (+) */}
            <p className="text-2xl font-bold pt-5">{activity.activityName}</p>
            <p className={`font-black text-4xl ${activity.category === 1 ? 'text-lime-500' : 'text-orange-500'} `}>
              {activity.calories} {' '} <span>Calorias</span>
            </p>
          </div>
          
          {/* //! Botones para cada evento */}
          <div className="flex gap-5 items-center">
            <button onClick={() => dispatch({ type: 'set-activeId', payload: {id: activity.id}})}>
              <PencilSquareIcon 
                className="h-8 w-8 text-gray-800"
              />
            </button>

            <button onClick={() => dispatch ({type: 'delete-activity', payload: { id: activity.id} })}>
              <XCircleIcon 
                className="h-8 w-8 text-red-800"
              />
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
