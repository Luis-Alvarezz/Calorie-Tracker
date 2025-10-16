type CalorieDisplayProps = {
  caloriesConsumedAndBurned: number,
  text: string
}

const calorieColor: {[textKey: string]: string} = {
  'Consumidas': 'text-lime-500',
  'Quemadas': 'text-orange-500',
  'Diferencia': 'text-red-500',
}

export default function CalorieDisplay({ caloriesConsumedAndBurned, text }: CalorieDisplayProps) {
  const colorClass = calorieColor[text] || 'text-gray-500'
  
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
      <span className={`font-black text-6xl ${colorClass}`}> {caloriesConsumedAndBurned} </span>
      {text}
    </p>
  )
}
