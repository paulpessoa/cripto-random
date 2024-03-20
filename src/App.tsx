import { useEffect, useState, useReducer } from 'react'

const getNumberFromApi = async (): Promise<number> => {
  try {
    const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new');
    const numberString = await res.text();
    return +numberString;
  } catch (error) {
    throw new Error("Oh my God");
  }
};
export const App = () => {
  const [number, setNumber] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [key, forRefetch] = useReducer((x) => x + 1, 0)


  useEffect(() => {
    setIsLoading(true)
    getNumberFromApi().then(num => setNumber(num))
      .catch(error => setError(error.message)
      )
  }, [key])

  useEffect(() => {
    if (number) setIsLoading(false)
  }, [number])

  useEffect(() => {
    if (error) setIsLoading(false)
  }, [error])



  return (
    <>
      {isLoading ?
        (<p>Loading...</p>)
        :
        (<p>Number: {number}</p>)
      }

      {!isLoading && error && <p>{error}</p>}
      <button onClick={forRefetch} disabled={isLoading}>{
        isLoading ? "... wait" : "Refetch"
      }
      </button>
    </>
  )
}

//https://cursos.devtalles.com/courses/take/react-query/lessons/39768682-mejorar-la-experiencia-de-usuario