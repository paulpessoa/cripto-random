import { useEffect, useState } from 'react'

const getNumberFromApi = async (): Promise<number> => {
  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new')
  const numberString = await res.text();
  return +numberString
}

export const App = () => {
  const [number, setNumber] = useState<number>()


  useEffect(() => {
    getNumberFromApi().then(num => setNumber(num))
  }, [])



  return (
    <>
      <h2>Número aleatório:</h2>
      <p>{number}</p>
      <button onClick={getNumberFromApi}>
        Gerar número
      </button>
    </>
  )
}

//https://cursos.devtalles.com/courses/take/react-query/lessons/39768682-mejorar-la-experiencia-de-usuario