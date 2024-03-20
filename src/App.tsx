import { useEffect, useState } from 'react'

const getNumberFromApi = async (): Promise<number> => {
  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new')
  const numberString = await res.text();
  return +numberString
}

export const App = () => {
  const [number, setNumber] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(true)


  useEffect(() => {
    getNumberFromApi().then(num => setNumber(num))
  }, [])

  useEffect(() => {
    if (number) setIsLoading(false)
  }, [number])



  return (
    <>
      <h2>Número aleatório:</h2>
      <p>{number}</p>
      {isLoading && <p>Cargando...</p>}
      <button onClick={getNumberFromApi}>
        Gerar número
      </button>
    </>
  )
}

//https://cursos.devtalles.com/courses/take/react-query/lessons/39768682-mejorar-la-experiencia-de-usuario