type CalorieDisplayProps = {
  caloriesConsumedAndBurned: number,
  text: string
}
export default function CalorieDisplay({ caloriesConsumedAndBurned, text }: CalorieDisplayProps) {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
      <span className={`font-black text-6xl ${text === 'Consumidas' ? 'text-orange-500' : 'text-lime-500'}`}> {caloriesConsumedAndBurned} </span>
      {text}
    </p>
  )
}
