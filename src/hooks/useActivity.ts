import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

// * Cuando usemos el Hook de 'useActivity' vamos a acceder a lo que tenemos en ActivityContext (el Objeto que retornamos en el return)
export const useActivity = () => {
  const context = useContext(ActivityContext)
  if (!context) {
    throw new Error('CustomHook useActivity must be used within a ActivityProvider')
  }
  return context
}