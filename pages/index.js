import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [estudiantes, setEstudiantes] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('estudiantes').select('*')
      if (error) console.error('Error:', error)
      else setEstudiantes(data)
    }
    fetchData()
  }, [])

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Lista de Estudiantes</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Fecha Nacimiento</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nombres}</td>
              <td>{c.apellidos}</td>
              <td>{new Date(c.fecha_nacimiento).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )

}
