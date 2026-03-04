// import { useMemo } from 'react' // * Para los Contadores de caloriesConsumed, caloriesBurned, caloriesDifference
// import type { Activity } from '../types/types'
import CalorieDisplay from './CalorieDisplay'
import { useActivity } from '../hooks/useActivity'

// type CalorieTrackerProps = {
//   activities: Activity[]
// }

// export default function CalorieTracker({ activities }: CalorieTrackerProps) {
export default function CalorieTracker() {
  const { caloriesConsumed, caloriesBurned, caloriesDifference } = useActivity()
  // console.log(state.activities)
  // const { activities } = state 
  
  
  return (
    <>
      <h2 className='text-4xl font-black text-white text-center'>Resumen de Calorías</h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay
          caloriesConsumedAndBurned={caloriesConsumed}
          text={'Consumidas'}
        />

        <CalorieDisplay 
          caloriesConsumedAndBurned={caloriesBurned}
          text={'Quemadas'}
        />

        <CalorieDisplay 
          caloriesConsumedAndBurned={caloriesDifference}
          text={'Diferencia'}
        />

      </div>
    </>
  )
}
